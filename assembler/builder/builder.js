//
// Copyright 2019-2020 Captech Partners and the original author or authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Authors:  Ivy An (ran3@dons.usfca.edu), Simon Lu (mlu18@dons.usfca.edu), Ziling Wang (zwang155@dons.usfca.edu)
//

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


	$.ajax({
		url: "http://localhost:5000/assembler/pages",
		type: "GET",
		success: function(result){
			var page_options = document.getElementById("pages");
			let pages = Object.keys(result);
			for(let i = 0; i < pages.length; i++){
				const option = document.createElement("option");
				option.textContent = pages[i];
				option.setAttribute('value', pages[i]);
				page_options.appendChild(option);
			}
		},
		error: function(result){
			console.log(result);
		}
	})
};

function clicksave() {
	var content = editor.getValue();
	var id = document.getElementById("fragment-id").textContent;

	if (id == ''){
		// Save new fragment
		const url = "http://localhost:5000/fragments";
		$.ajax({
			url: url,
			type: "POST",
			dataType: "json",
			contentType:"application/json",
			data: JSON.stringify({html: content}),
			success: function(result){
				console.log('success');
				onload();
			},
			error: function(result){
				console.log(result);
				onload();
				clickfrag(id);
			},
		});
	}else{
		const url = "http://localhost:5000/fragments/" + id;
		$.ajax({
			url: url,
			type: "PUT",
			dataType: "json",
			contentType:"application/json",
			data: JSON.stringify({html: content}),
			success: function(result){
				console.log('success');
				onload();
				clickfrag(id);
			},
			error: function(result){
				console.log(result);
				onload();
				clickfrag(id);
			},
		});
	}
};

function newfrag(){
	onload();
	editor.setValue("");
}

function deletefrag(id){
	const url = `http://localhost:5000/fragments/${id}`;
	$.ajax({
		url: url,
		type: "DELETE",
		success: function(result){
			alert(`Fragment ${id} deleted`);
			onload();
		},
		error: function(result){
			console.log(result);
		}
	})
}


function preview()
{
	var page_dropdown = document.getElementById("pages");
	var page = page_dropdown.options[page_dropdown.selectedIndex].value;
	var labels = document.getElementById("labels").value;
	window.open(`http://localhost:5000/${page}?label=${labels}`, "_blank");
}


function clickfrag(id)
{
	const url = `http://localhost:5000/fragments/${id}`;
	$.ajax({
		url: url,
		type: "GET",
		success: function(result){
			var info = document.getElementById("editor-frament-info");
			// Clear previous data
			while (info.firstChild) {
				info.removeChild(info.firstChild);
			}
			const body = document.createElement("p");
			body.setAttribute('style', 'white-space: pre;');

			body.textContent = `id attribute: ${result.id_attr}\n`
				+ `class attribute: ${result.class_attr}\n`
				+ `file name: ${result.file_name}\n`
				+ `joint size: ${result.joints.length}\n`;
			info.appendChild(body);

			// Set ids display
			document.getElementById("fragment-id").textContent = result.id;
			console.log(result.html);
			editor.setValue(result.html);

			// render delete link
			var deletecontainer = document.getElementById("delete-container");
			while (deletecontainer.firstChild) {
				deletecontainer.removeChild(deletecontainer.firstChild);
			}
			const del = document.createElement("button");
			del.setAttribute("class", "button");
			del.setAttribute("onclick", `javascript:deletefrag(${result.id});`);
			del.setAttribute("style", "padding-top:3px;padding-left:5px;width:45px;height:25px;font-size:12px;");
			del.textContent = "delete";
			deletecontainer.appendChild(del);
		},
		error: function(result){
			console.log(result);
		}
	})
}
