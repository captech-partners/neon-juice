# TASKLIST  
[//]: <> (Please add two spaces after the task bullet to make a new line. This will stop the code from being one big awkward sentence.)
## General Setup  
- [x] Add page viewer | PH  
- [x] Make page viewer dropdown options functional | PH   
- [ ] Create fragments for premade components, should have form input fields working before starting this task  
- [ ] Create default template with premade fragments mentioned above   
- [ ] Update README.md  
## Frontend API Fucntions/Axios Functions  
- [ ] Add input validation for API calling methods  
- [ ] Make API calling methods into utility functions in a separate file  
## Frontend Structure & Refining  
- [x] Split up components in FragmentLists - Accordion, PopOver etc | PH  
## Page Viewer Functionality  
- [x] Remove harded variables in PageViewer Component in SecondPage.js | PH  
- [x] Add Multiselect dropdown for labels and have the PageViewer call the API with more than one label | PH  
- [ ] Fix label default value on update and empty dropdown width  
## Start Page Functionality  
- [x] Fix Import Button's Modal submit button | AM  
- [ ] Have the imported files show in the Component and Layout Panel | AM  
## Fragment Settings Modal Functionality  
- [x] Fix html for post and put methods, save and lift state of code editor code | PH  
- [x] Have the code in the editor appear when the modal opens, right now it appears when you click on the editor | PH  
- [x] Create dropdown options for viewing a template based on which page and label | PH  
- [x] Toggle editor and input forms in FragmentSettingsModal | AI  
- [x] Have the Fragment Modal option dropdowns Pages and Template highlight the pages and templates where the fragment appears | PH  
- [x] Change Type of Subcomponent input to multi select | PH  
- [x] Create a system for adding joints to the fragment or template | PH   
- [ ] Have the form input change the html in the code editor | AI  
- [ ] Add default input into Create a Component & Create a Layout in FragmentSettingsModal code editor  
- [ ] Convert Joint Input to html code
- [ ] Remove data-id variable from dupicate fragment div tag  
## Fragment Popover Functionality  
- [x] Create modal to prompt user if they are sure they want to delete a fragment - modal connected to the trash button | PH  
- [x] Setup the view button on Template PopOver, eyeball button, so the page viewer inputs(dropdowns) update with the current template's data-page and data-label variables | PH
- [x] Update url when dropdowns are updated | PH    
- [ ] Setup the add button on Fragment PopOver so the fragment will be added to the current template and seen on the page viewer  
## Fragment Panel Functionality  
- [x] Need to raise state of the fraglist and templist in FragmentPanel | PH  
- [x] Update fragment list and template list when fragment is created or deleted | PH  
## Tutorial Functionality  
- [x] Add helpful tooltips | PH  
- [x] Have the toggle switch in the navbardropdown affect the visibility of the TutorialInterface | PH  
- [ ] Add PopOvers or Toasts or maybe update tooltips for tutorial instructions | PH  
- [ ] Need to remove prev and next icon on TutorialInterface carousel  
## API Functionality  
- [ ] Fix errors with the backend assets.html and deletion of tp1 & tp2 when it is edited and put to the API  
- [ ] Fix joint implementation - add n # of a subcomponent
- [ ] Change the way templates are initialized or create a blank or default fragment with the data-page and template name in data-template  
- [ ] Post Method needs to create a new html file with the fragment class_attr, also needs file name input validation
- [ ] Put Method need to receive the file of the fragment and insert changed into the file  
- [ ] Figure out the error "template_set = self.template_map[template.file_name]  # fragments under template" when you view a template created with the frontend  
- [ ] Add a API call that returns just the child types for the joints as a 2D array  
## Search Bar Functionality  
- [x] Add Search bars to fragment/template panels | PH  
- [ ] Clear search bar when opening the other accordion card | PH  
## Image Adding Functionality  
- [x] Add refresh button for components and layout cards next to the search bar | PH  
- [ ] Add a method in the API that adds a picture file to static/images file  
- [ ] Add picture input into Fragment Modal options  
## Bugs to Fix
- [ ] When I press enter in the empty search bar it goes to the start page, please fix