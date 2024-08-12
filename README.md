# Zume Training System
Zume Training System

## Installation

Run

`npm i`

and

`composer install`

then run

`npm run dev`

to get the build environment bundling JS and CSS as files are developed

## Hiding large diffs

As part of the build process the javascript and css files names change every time a change is made to the css or js.

This results in these files showing up as being deleted in the git diffs, and makes it very difficult to see the actual diffs of the changed code.

To hide these large red diffs of removed code add the following to hide the build artifacts from the git diff.

```js
//.git/config

[diff "buildartifacts"]
        textconv = "echo 'Contents hidden from diff'"
```

This hides the files that are marked in .gitattributes as buildartifacts


This project is tested with BrowserStack.

## Browser Support.

On looking at the data of which browsers are most used on zume.training in the last 12 months, we have decided to support

* Macintosh Intel 10.15+ (Catalina), Safari 13.1+
* iOS 14+ (Safari 14+)
* Android 7+
* Chrome 85+