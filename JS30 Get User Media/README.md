# getUserMedia API

## Preface

This is likely one of the most awaited project in the #javascript30 course. The [video itself](https://youtu.be/ElWFcBlVk-o) is rather meaty, so I decided to develop a simple application learning from the video, and one step at a time.

## The idea

Develop an application which allows to take pictures of yourself. I started with the idea to design the UI of a photo booth, but I landed on the simple design of a camera. This camera currently is set to have a single button in the top right corner, and present a canvas element in the very center. As the instructor details, the video retrieved from `getUserMedia` is fed, piped to a canvas element (which is the element allowing to ultimately take pictures). I thought it neat to feed the video into a circular container, although I am unsure of the final result.

Below the camera, prominently featured on the page, the application ought to display the images took with the camera in a container. I choose to use a row layout, with a fixed width and scroll when the pictures overflow the size of the container, but the design of the element is not set into stone.

## The flow

The flow is eerily simple:

- allow access to the webcam. There might be also a way to make this choice to fall back on a whimsical default. Something for later consideration.

- have the feed displayed smack in the middle of the camera.

- click the button to have images presented right below it.

- click on the images to download them. There also must be a better way to show how clicking on the images allows to download them. Something akin to a tooltip/overlay.
