import { GalleryItem } from '../components/Gallery';

/**
 * Gets all images from a public directory
 * @param directoryPath Path to the directory (e.g., "/illustrations")
 * @returns A Promise that resolves to an array of GalleryItem objects
 */
export const getImagesFromPublicDirectory = async (directoryPath: string): Promise<GalleryItem[]> => {
  try {
    // Using Vite's import.meta.glob to get all files from the directory
    const imageFiles = import.meta.glob('/public/**/*.{png,jpg,jpeg,gif,webp,svg}', { eager: true });
    
    // Filter files that match our directory
    const directoryPrefix = `/public${directoryPath}`;
    
    const filteredFiles = Object.keys(imageFiles)
      .filter(path => path.startsWith(directoryPrefix))
      .map((path, index) => {
        // Extract filename from path
        const filename = path.split('/').pop() || 'Untitled';
        // Remove extension and convert to title case
        const title = filename
          .replace(/\.\w+$/, '') // Remove extension
          .replace(/([A-Z])/g, ' $1') // Add space before capital letters
          .replace(/^./, str => str.toUpperCase()); // Uppercase first letter
        
        // Create path for browser (without /public prefix)
        const imageSrc = path.replace('/public', '');
        
        return {
          id: index + 1,
          title,
          imageSrc
        };
      });
    
    return filteredFiles;
  } catch (error) {
    console.error('Error loading images from directory:', error);
    return [];
  }
};

/**
 * Gets all videos from a public directory
 * @param directoryPath Path to the directory (e.g., "/video-edits")
 * @returns A Promise that resolves to an array of GalleryItem objects
 */
export const getVideosFromPublicDirectory = async (directoryPath: string): Promise<GalleryItem[]> => {
  try {
    // Using Vite's import.meta.glob to get all video files from the directory
    const videoFiles = import.meta.glob('/public/**/*.{mp4,webm,mov,avi}', { eager: true });
    
    // Also try to find thumbnail images in the same directory
    const thumbnailFiles = import.meta.glob('/public/**/*.{png,jpg,jpeg,webp}', { eager: true });
    
    // Filter files that match our directory
    const directoryPrefix = `/public${directoryPath}`;
    
    const filteredFiles = Object.keys(videoFiles)
      .filter(path => path.startsWith(directoryPrefix))
      .map((path, index) => {
        // Extract filename from path
        const filename = path.split('/').pop() || 'Untitled';
        const filenameWithoutExt = filename.replace(/\.\w+$/, '');
        
        // For UI display - use a simple identifier instead of the file name
        // to avoid showing the full file name to users
        const displayTitle = `Video ${index + 1}`;
        
        // Create path for browser (without /public prefix)
        const videoSrc = path.replace('/public', '');
        
        // Look for a matching thumbnail image (same name, different extension)
        // First check for an explicit thumbnail with -thumb suffix
        const thumbPattern = new RegExp(`${directoryPrefix}/${filenameWithoutExt}-thumb\\.(png|jpg|jpeg|webp)$`);
        // Then check for a file with the same name but image extension
        const sameNamePattern = new RegExp(`${directoryPrefix}/${filenameWithoutExt}\\.(png|jpg|jpeg|webp)$`);
        
        // Find a thumbnail with matching patterns
        const thumbnailPath = Object.keys(thumbnailFiles).find(
          path => thumbPattern.test(path) || sameNamePattern.test(path)
        );
        
        // Use the found thumbnail or generate a default one
        let imageSrc = thumbnailPath 
          ? thumbnailPath.replace('/public', '')
          : '/cardfaces/video-placeholder.svg'; // Use the SVG placeholder we created
        
        // Fallback to Vite logo if no placeholder exists
        if (imageSrc === '/cardfaces/video-placeholder.svg') {
          try {
            // Try to check if the file exists (this may not work in all environments)
            fetch(imageSrc).catch(() => {
              imageSrc = '/vite.svg'; // Fallback to Vite logo
            });
          } catch {
            imageSrc = '/vite.svg'; // Fallback to Vite logo
          }
        }
        
        return {
          id: index + 1,
          title: displayTitle, // Use display title instead of file name
          imageSrc,
          videoSrc
        };
      });
    
    // Log what was found
    console.log('Found videos:', filteredFiles);
    
    // If no videos were found, return default placeholders
    if (filteredFiles.length === 0) {
      return [
        {
          id: 1,
          title: 'Example Video',
          imageSrc: '/cardfaces/video-placeholder.svg',
          videoSrc: 'https://example.com/placeholder.mp4' // This won't actually play
        }
      ];
    }
    
    return filteredFiles;
  } catch (error) {
    console.error('Error loading videos from directory:', error);
    return [
      {
        id: 1,
        title: 'Example Video',
        imageSrc: '/cardfaces/video-placeholder.svg',
        videoSrc: 'https://example.com/placeholder.mp4' // This won't actually play
      }
    ];
  }
}; 

/**
 * Gets YouTube video URLs from a text file in the public directory
 * @param directoryPath Path to the directory (e.g., "/video-edits")
 * @param fileName Name of the text file containing URLs (e.g., "video-edits-urls")
 * @returns A Promise that resolves to an array of GalleryItem objects with YouTube embeds
 */
export const getYouTubeVideosFromTextFile = async (directoryPath: string, fileName: string): Promise<GalleryItem[]> => {
  try {
    // Get the full path to the text file
    const filePath = `${directoryPath}/${fileName}`;
    
    // Fetch the text file from the public directory
    const response = await fetch(filePath);
    
    if (!response.ok) {
      console.error(`Failed to fetch ${filePath}: ${response.status} ${response.statusText}`);
      return [];
    }
    
    // Get the text content
    const text = await response.text();
    
    // Split text into lines and filter out empty lines
    const lines = text.split('\n').filter(line => line.trim() !== '');
    
    // Process each line as a YouTube URL
    const videoItems = lines.map((line, index) => {
      // Extract video info from the line
      // Expected format: URL|title or just URL (title will be auto-generated)
      const parts = line.split('|');
      const videoUrl = parts[0].trim();
      let videoTitle = parts[1]?.trim() || `Video ${index + 1}`;
      
      // Extract YouTube video ID
      const videoId = extractYouTubeVideoId(videoUrl);
      
      // Generate thumbnail URL
      const thumbnailUrl = videoId 
        ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` 
        : '/vite.svg';
      
      return {
        id: index + 1,
        title: videoTitle,
        imageSrc: thumbnailUrl,
        videoSrc: videoUrl,
        isYouTube: true,
        youtubeId: videoId
      };
    });
    
    console.log(`Loaded ${videoItems.length} YouTube videos from ${filePath}`);
    return videoItems;
  } catch (error) {
    console.error(`Error loading YouTube videos from ${fileName}:`, error);
    return [];
  }
};

/**
 * Extracts the video ID from a YouTube URL
 * @param url YouTube URL
 * @returns The video ID or null if not found
 */
function extractYouTubeVideoId(url: string): string | null {
  // Regular expressions to match various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\?\/]+)/,
    /youtube\.com\/watch\?.*v=([^&]+)/,
    /youtube\.com\/shorts\/([^&\?\/]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
} 