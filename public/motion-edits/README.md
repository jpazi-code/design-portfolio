# Motion Edits Instructions

## How to Add YouTube Videos to Your Portfolio

To add your YouTube videos to the Motion Edits page, simply edit the `motion-edits-urls` file in this directory.

### Format
Each line in the file should contain a YouTube URL and optionally a title, separated by a pipe character (`|`):

```
https://www.youtube.com/watch?v=VIDEO_ID|My Motion Animation Title
```

If you don't provide a title, one will be generated automatically (like "Video 1", "Video 2", etc.).

### Supported URL Formats
- Standard YouTube: `https://www.youtube.com/watch?v=VIDEO_ID`
- Short YouTube: `https://youtu.be/VIDEO_ID`
- YouTube Embed: `https://www.youtube.com/embed/VIDEO_ID`
- YouTube Shorts: `https://youtube.com/shorts/VIDEO_ID`

### Example
```
https://www.youtube.com/watch?v=GOtL9PCYjGE|Creative Motion Animation
https://youtu.be/5qap5aO4i9A|Relaxing Motion Design
```

The changes will be automatically reflected on your site once you save the file and refresh the page. 