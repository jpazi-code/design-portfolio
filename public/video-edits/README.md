# Video Edits Instructions

## How to Add YouTube Videos to Your Portfolio

To add your YouTube videos to the Video Edits page, simply edit the `video-edits-urls` file in this directory.

### Format
Each line in the file should contain a YouTube URL and optionally a title, separated by a pipe character (`|`):

```
https://www.youtube.com/watch?v=VIDEO_ID|My Video Title
```

If you don't provide a title, one will be generated automatically (like "Video 1", "Video 2", etc.).

### Supported URL Formats
- Standard YouTube: `https://www.youtube.com/watch?v=VIDEO_ID`
- Short YouTube: `https://youtu.be/VIDEO_ID`
- YouTube Embed: `https://www.youtube.com/embed/VIDEO_ID`
- YouTube Shorts: `https://youtube.com/shorts/VIDEO_ID`

### Example
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ|Amazing Edit
https://youtu.be/9bZkp7q19f0|PSY Video
```

The changes will be automatically reflected on your site once you save the file and refresh the page. 