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

const app = document.getElementById('pages&templates');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

//pages
const request = new XMLHttpRequest();
request.open('GET', 'http://localhost:5000/assembler/pages',true);
request.send();
request.onload = function () {
    // Begin accessing JSON
    const data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        const page = document.createElement("div");
        const h1 = document.createElement('h1');
        h1.textContent = 'Pages';
        container.appendChild(page);
        page.appendChild(h1);
        let pages = Object.keys(data);
        for(let i = 0; i < pages.length; i++){
            const p = document.createElement('p');
            p.setAttribute('style', 'font-size:20px')
            p.textContent = pages[i];
            const label = document.createElement('label');
            label.setAttribute('class', 'switch');
            label.setAttribute('align', 'right');
            const checkbox = document.createElement('input');
            checkbox.setAttribute('type','checkbox');
            checkbox.setAttribute('id',pages[i]);
            checkbox.setAttribute('onclick', "activePage(pages[i]);");
            checkbox.onclick = function activatePage() {
                const checkbox = document.getElementById(pages[i]);
                if (checkbox.checked === true){
                    alert("activate " + pages[i]);
                    const request = new XMLHttpRequest();
                    request.open('GET', 'http://localhost:5000/assembler/pages/'+ pages[i] +'/activate',true);
                    request.send();
                }else{
                    alert("deactivate " + pages[i]);
                    const request = new XMLHttpRequest();
                    request.open('GET', 'http://localhost:5000/assembler/pages/'+ pages[i] +'/deactivate',true);
                    request.send();
                }
            };
            console.log('here'+ data[pages[i]]);
            checkbox.checked = data[pages[i]];

            const slider = document.createElement('span');
            slider.setAttribute('class','slider round');
            page.appendChild(p);
            p.appendChild(label);
            label.appendChild(checkbox);
            label.appendChild(slider);
        }
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        app.appendChild(errorMessage);
    }
};

//templates
const template_request = new XMLHttpRequest();
template_request.open('GET', 'http://localhost:5000/assembler/templates',true);
template_request.send();
template_request.onload = function () {
    // Begin accessing JSON
    const data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        const template = document.createElement("div");
        const h1 = document.createElement('h1');
        h1.textContent = 'Templates';
        container.appendChild(template);
        template.appendChild(h1);
        let templates = Object.keys(data);
        for(let i = 0; i < templates.length; i++){
            const p = document.createElement('p');
            p.setAttribute('style', 'font-size:20px')
            p.textContent = templates[i];
            const label = document.createElement('label');
            label.setAttribute('class', 'switch');
            const checkbox = document.createElement('input');
            checkbox.setAttribute('type','checkbox');
            checkbox.setAttribute('id',templates[i]);
            checkbox.setAttribute('onclick', "activeTemplates();");
            checkbox.onclick = function activeTemplates() {
                const checkbox = document.getElementById(templates[i]);
                if (checkbox.checked === true){
                    alert("activate " + templates[i]);
                    const request = new XMLHttpRequest();
                    request.open('GET', 'http://localhost:5000/assembler/templates/'+ templates[i] +'/activate',true);
                    request.send();
                }else{
                    alert("deactivate " + templates[i]);
                    const request = new XMLHttpRequest();
                    request.open('GET', 'http://localhost:5000/assembler/templates/'+ templates[i] +'/deactivate',true);
                    request.send();
                }
            };
            console.log('here'+ data[templates[i]]);
            checkbox.checked = data[templates[i]];
            const slider = document.createElement('span');
            slider.setAttribute('class','slider round');
            template.appendChild(p);
            p.appendChild(label);
            label.appendChild(checkbox);
            label.appendChild(slider);
        }
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        app.appendChild(errorMessage);
    }
};
