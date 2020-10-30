#
# Copyright 2019-2020 Captech Partners and the original author or authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# Authors:  Ivy An (ran3@dons.usfca.edu), Simon Lu (mlu18@dons.usfca.edu), Ziling Wang (zwang155@dons.usfca.edu)
#

import copy
#import xml.etree.ElementTree as ETree
import glob
import hashlib
import os
import shutil
from lxml import etree as ETree


def package(directory, output_path, output_file='package'):
    shutil.make_archive(f'{output_path}/{output_file}', 'zip', directory)

    # Read archive bytes for hash digest
    f = open(f'{output_path}/{output_file}.zip', 'rb')
    read_bytes = f.read()
    f.close()

    return hashlib.sha256(read_bytes).hexdigest()


def save_to_file(fragment_id: int, fragment):
    file = fragment.path
    if not os.path.exists(file):
        clear_file(file)
    # TODO: check ETree
    tree = ETree.parse(fragment.path)
    root = tree.getroot()
    fragment_etree = copy.deepcopy(fragment.etree)
    fragment_etree.set('data-id', str(fragment_id))
    root.append(fragment_etree)
    pretty_xml(root)
    # pretty_xml(fragment_etree, level=1)
    tree.write(fragment.path, encoding="utf-8")


def delete_from_file(fragment_id: int, fragment):
    file = fragment.path
    id_str = str(fragment_id)
    # TODO: check ETree
    tree = ETree.parse(fragment.path)
    root = tree.getroot()
    for fragment_element in root:
        if fragment_element.attrib['data-id'] == id_str:
            root.remove(fragment_element)
            tree.write(fragment.path, encoding='utf-8')
    f = open(file, 'r')
    if len(f.readlines()) <= 2:
        f.close()
        os.remove(file)
    return


def clear_file(html_file):
    f = open(html_file, 'w')
    f.write('<html></html>')
    f.close()


def compile_html(fragment_collection, path):
    fragments = glob.glob(f"{path}/*.html")
    for fragment in fragments:
        build_fragment_from_file(fragment_collection, fragment)


def build_fragment_from_file(fragment_collection, html_file):
    # TODO: check ETree
    root = ETree.parse(html_file).getroot()
    clear_file(html_file)
    fragment_collection.build_fragment(root, html_file)


def pretty_xml(element: ETree.Element, level=0):
    indent = '\n' + level * '\t'
    next_indent = indent + '\t'
    child_count = len(element)
    if child_count > 0:
        if not element.text or not element.text.strip():
            element.text = next_indent
        for i in range(child_count):
            element[i].tail = next_indent if i < child_count - 1 else indent
            pretty_xml(element[i], level + 1)