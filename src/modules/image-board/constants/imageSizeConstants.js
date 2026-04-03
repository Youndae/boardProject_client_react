export const IMAGE_SIZE = Object.freeze({
    SMALL: 300,
    MEDIUM: 600,
});

export const IMAGE_SIZE_BREAKPOINTS = Object.freeze([
    { maxWidth: 720, size: IMAGE_SIZE.SMALL },
    { maxWidth: 1024, size: IMAGE_SIZE.MEDIUM },
]);

export const IMAGE_SIZE_STYLE = Object.freeze({
    [IMAGE_SIZE.SMALL] : { width: '300px', height: '300px'},
    [IMAGE_SIZE.MEDIUM] : { width: '600px', height: '600px'},
})