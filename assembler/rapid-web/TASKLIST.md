# TASKLIST  
[//]: <> (Please add two spaces after the task bullet to make a new line. This will stop the code from being one big awkward sentence.)
### General Setup
- [x] Add page viewer | PH  
- [x] Make page viewer dropdown options functional | PH  
- [x] Update README.md | PH  
- [x] Create fragments for premade components | PH  
- [ ] Create default template with the frontend   
### Frontend API Functions/Axios Functions
- [x] Add input validation for API calling methods | PH  
### Frontend Structure & Refining
- [x] Split up components in FragmentLists - Accordion, PopOver etc | PH  
- [ ] Add JS Doc to each component and function in the code  
### Page Viewer Functionality
- [x] Remove harded variables in PageViewer Component in SecondPage.js | PH  
- [x] Add Multiselect dropdown for labels and have the PageViewer call the API with more than one label | PH  
- [x] Fix label default value on update and empty dropdown width | PH  
### Start Page Functionality
- [x] Fix Import Button's Modal submit button | AM  
- [ ] Have the imported files show in the Component and Layout Panel | AM  
### Fragment Settings Modal Functionality
- [x] Fix html for post and put methods, save and lift state of code editor code | PH  
- [x] Have the code in the editor appear when the modal opens, right now it appears when you click on the editor | PH  
- [x] Create dropdown options for viewing a template based on which page and label | PH  
- [x] Toggle editor and input forms in FragmentSettingsModal | AI  
- [x] Have the Fragment Modal option dropdowns Pages and Template highlight the pages and templates where the fragment appears | PH  
- [x] Change Type of Subcomponent input to multi select | PH  
- [x] Create a system for adding joints to the fragment or template | PH   
- [x] Have the form input change the html in the code editor | AI  
- [x] Raise state of name from FragmentSettingsModal to FragmentList or move get, post, and put method in FragmentSettingsModal for the file name in the post and put methods | PH  
- [x] Add default input into Create a Component & Create a Layout in FragmentSettingsModal code editor | PH  
- [ ] Convert Joint Input to html code  
- [ ] Add input validation in each input field in FragmentSettingsModal  
### Fragment Popover Functionality
- [x] Create modal to prompt user if they are sure they want to delete a fragment - modal connected to the trash button | PH  
- [x] Setup the view button on Template PopOver, eyeball button, so the page viewer inputs(dropdowns) update with the current template's data-page and data-label variables | PH
- [x] Update url when dropdowns are updated | PH    
- [ ] Setup the add button on Fragment Popover so the fragment will be added to the current template and seen on the page viewer  
### Fragment Panel Functionality
- [x] Need to raise state of the fraglist and templist in FragmentPanel | PH  
- [x] Update fragment list and template list when fragment is created or deleted | PH  
### Tutorial Functionality
- [x] Add helpful tooltips | PH  
- [x] Have the toggle switch in the navbardropdown affect the visibility of the TutorialInterface | PH  
- [x] Add PopOvers or Toasts or maybe update tooltips for tutorial instructions | PH  
### API Functionality
- [x] Fix errors with the backend assets.html and deletion of tp1 & tp2 when it is edited and put to the API  
- [x] Post Method needs to create a new html file with the fragment class_attr | PH  
- [x] Have the delete function remove the file from the directory if the file is empty | PH  
### Search Bar Functionality
- [x] Add Search bars to fragment/template panels | PH  
- [x] Clear search bar when opening the other accordion card | PH  
- [x] Add refresh button for components and layout cards next to the search bar | PH  
### Bugs to Fix
- [x] When I press enter in the empty search bar it goes to the start page, please fix | PH  
- [ ] Figure out the error "template_set = self.template_map[template.file_name] # fragments under template" when you view a template created with the frontend  
## After MVP is Completed
### Image Adding Functionality
- [ ] Add a method in the API that adds a picture file to static/images file  
- [ ] Add picture input into Fragment Modal options  
### Project Management Functionality
- [ ] Add a dashboard for multiple started projects on the Start Page  
### Stylying Functionality
- [ ] Add css styling options (width, height, background color, font)  
### Finishing the Website Design
- [ ] Figure out how the user will deploy the website. Will they download the layout html onto their computer?