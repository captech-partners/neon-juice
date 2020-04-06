import React from 'react';

import styled from 'styled-components';


$(document).ready(onload);

function onload(){
	const url = "http://localhost:5000/fragments";
	$.ajax({
		url: url,
		type: "GET",
		success: function(result){
			var sidelist_fragments = document.getElementById("sidelist-fragments");
			var sidelist_templates = document.getElementById("sidelist-templates");
			// Clear previous data
			while (sidelist_fragments.firstChild) {
				sidelist_fragments.removeChild(sidelist_fragments.firstChild);
			}
			// Clear previous data
			while (sidelist_templates.firstChild) {
				sidelist_templates.removeChild(sidelist_templates.firstChild);
			}

			result.sort(function(a, b) {
				return a.id - b.id  ||  a.class_attr.localeCompare(b.class_attr);
			});

			let fragments = Object.keys(result);
			for(let i = 0; i < fragments.length; i++){
				const fragment = document.createElement("a");
				fragment.textContent = `Fragment ${result[i].id}: ${result[i].class_attr}`;
				fragment.setAttribute('class', 'sidelist-fragment');
				fragment.setAttribute('id', result[i].id)
				fragment.setAttribute('href', `javascript:clickfrag(${result[i].id});`)
				if (result[i].id > 0){
					sidelist_fragments.appendChild(fragment);
				}else{
					sidelist_templates.appendChild(fragment);
				}
			}
			document.getElementById("fragment-id").textContent = "";
			var info = document.getElementById("editor-frament-info");
			// Clear previous data
			while (info.firstChild) {
				info.removeChild(info.firstChild);
			}
		},
		error: function(result){
			console.log(result);
		}
	})
};



const Sidebar = styled.div`
  width: 250px;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #f1ebf2;
`;

const FragmentTemplateList = () => {
  return (
    <Sidebar>
      <p>Fragments</p>
      <div id="sidelist-fragments"></div>

      <p>Templates</p>
      <div id="sidelist-templates"></div>
    </Sidebar>
  );
};

export default FragmentTemplateList;
