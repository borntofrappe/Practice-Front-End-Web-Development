# Checkbox Challenge Select

## Preface

Pursuing once more a project inspired by the great #javascript30 initiative, I set out to create a simple series of checkboxes which allow for a neat functionality, namely the ability to check multiple input elements at once, by holding down a ctrl (on windows) key. Simply put the feature ought to work as follows, and from the user's perspective:

- check input elements as always;

- as I hold down the specified key and check a distant input, check all the elements in between.

A good way to practice with event listeners and a few JavaScript methods. My approach, before I dive into the specific video provided by Wes Bos, is as follows:

- listen for a keydown event on the entire window. This event should set a boolean to true to enable for the multiple-checkboxes functionality;

- listen symmetrically for a keyup event, which shoud mirror the previous event's behavior;

- listen for the input event on the checkboxes and if the partcular boolean is set to true, benefit from another variable to select all input elements by their index in the array resulting from the `querySelectorAll` method (cognizant of the fact that 1. I need this variable to be initiated and 1. the specific method returns a NodeList, not an array).

## Update

Solid practice. In the end I changed the erase method a bit, to allow it to clear multiple entries, were these to match in value.
