design principles
=================

This is software targeted at low end smart phones. It needs to be as light and fast and simple as possible.

* No javascript frameworks. Use only vanilla javascript. Much smaller, much lighter. Often ends up being simpler too.
* Keep images to a minimum. Use css effects instead whereever possible.
* Single page load with everything embedded, no linked css, js, or images.
* Use modern standards, don't support legacy browsers. Allows more things to be pushed out of js and onto native browser capabilities.
* Be thoughtful about performance, don't have javascript creating and destroying huge chunks of html, or doing heavy processing.

Keep code maintainable.

* Use the less css preprocessor to reduce and simplify code size.
* Use the twig html preprocessor to reduce and modularize code.
