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

import collections
import copy
import xml.etree.ElementTree as ETree
import os
import random
import lxml.html
from lxml import etree
from utils import save_to_file, delete_from_file, pretty_xml


class Fragment(object):
	"""
		A fragment is an immutable object that contains:
		id_attr: An optional id given to the fragment - attr: id
		class_attr: The class of the given fragment - attr: class
		etree: The HTML body of the fragment, represented as an ElementTree
		joints: A list of Joint obj that belong to this fragment
		labels_attr: A list of labels that this fragment can appear - attr: data-labels
		templates_attr: A list of template that this fragment can appear - attr: data-templates
		pages_attr: A list of pages that this fragment can appear - attr: data-pages
		path: The path of the HTML file that this fragment is built from(used for write back on change)
		A fragment is built using FragmentBuilder, invoked by the FragmentCompiler
		which compiles source HTML files into Fragment objects.
	"""

	def __init__(self):
		self.id_attr = None
		self.class_attr = None
		self.etree = None
		self.joints = None
		self.labels_attr = None
		self.templates_attr = None
		self.pages_attr = None
		self.path = None
		self.file_name = None

	def is_template(self) -> bool:
		return 'data-template' not in self.etree.attrib

	def to_dict(self, fragment_id: int) -> {}:
		return {'id': fragment_id,
				'id_attr': self.id_attr,
				'class_attr': self.class_attr,
				'html': ETree.tostring(self.etree, 'UTF-8', 'html').decode('utf-8'),
				'joints': [j.to_dict() for j in self.joints],
				'labels': self.labels_attr,
				'templates': self.templates_attr,
				'pages': self.pages_attr,
				'file_name': self.file_name}


class Joint(object):
	"""
		A Joint contains:
		etree: The HTML body of the joint
		child_types: A list of string contains the id or class of the supported child_types
		limit: The size limit of this Joint
	"""

	def __init__(self, npath: [], child_types: list, limit: int):
		self.npath = npath
		self.child_types = child_types  # attr: data-child-type
		self.limit = limit  # attr: data-child-limit

	def is_compatible(self, fragment: Fragment) -> bool:
		return fragment.class_attr in self.child_types or fragment.id_attr in self.child_types

	def to_dict(self) -> {}:
		return {"child_types": self.child_types, "limit": self.limit}


class FragmentBuilder(object):
	"""
		Builder class for Fragment
	"""

	def __init__(self):
		self.fragment = Fragment()

	def id_attr(self, id_attr: str):
		self.fragment.id_attr = id_attr
		return self

	def class_attr(self, class_attr: str):
		self.fragment.class_attr = class_attr
		return self

	def etree(self, etree: ETree.Element):
		self.fragment.etree = etree
		return self

	def joints(self, joints: list):
		self.fragment.joints = joints
		return self

	def labels_attr(self, labels_attr: list):
		self.fragment.labels_attr = labels_attr
		return self

	def templates_attr(self, templates_attr: list):
		self.fragment.templates_attr = templates_attr
		return self

	def pages_attr(self, pages_attr: list):
		self.fragment.pages_attr = pages_attr
		return self

	def path(self, path: str):
		self.fragment.path = path
		return self

	def file_name(self, file_name: str):
		self.fragment.file_name = file_name
		return self

	def build(self) -> Fragment:
		return self.fragment


class FragmentCollection(object):
	"""
		A search data structure that contains all instances of built fragments
		Contains a few data structures:
		Map<name: str, Fragment> -> store all templates (1 for active, 1 for inactive)
		Map<class: str, Set<Fragment>> -> for lookup fragments by class
		Map<id: str, Fragment> -> for lookup fragments by id
		Map<template: str, Set<Fragment>> -> for lookup fragments by templates
		Map<label: str, Set<Fragment>> -> for lookup fragments by labels
		Map<page: str, Set<Fragment>> -> for lookup fragments by pages (1 for active, 1 for inactive)
	"""

	def __init__(self):
		# initialize all data structures above
		self.root_dir = ""
		self.template_name_map = {}
		self.template_name_deactivate_map = {}
		self.class_map = {}
		self.id_map = {}
		self.template_map = {}
		self.label_map = {}
		self.page_map = {}
		self.page_deactivate_map = {}
		# record of ids
		self.identify_map = {}
		self.template_id_count = 0
		self.fragment_id_count = 0
		self.template_empty_id = collections.deque()
		self.fragment_empty_id = collections.deque()

	def get_templates(self):
		json_list = {}
		for key in self.template_name_map:
			json_list[key] = True
		for key in self.template_name_deactivate_map:
			json_list[key] = False
		return json_list

	def get_pages(self):
		json_list = {}
		for key in self.page_map:
			json_list[key] = True
		for key in self.page_deactivate_map:
			json_list[key] = False
		return json_list

	def get_fragments(self, query_id, query_labels, query_templates, query_pages):
		check_id = len(query_id) == 0
		check_labels = len(query_labels) == 0
		check_templates = len(query_templates) == 0
		check_pages = len(query_pages) == 0
		result_list = []
		for key, fragment in self.identify_map.items():
			if (check_id or key in query_id) \
					and (check_labels or not set(fragment.labels_attr).isdisjoint(query_labels)) \
					and (check_templates or not set(fragment.templates_attr).isdisjoint(query_templates)) \
					and (check_pages or not set(fragment.pages_attr).isdisjoint(query_pages)):
				result_list.append(fragment.to_dict(key))
		return result_list

	def post_fragments(self, json) -> bool:
		html = json['html']
		try:
			et_root = lxml.html.fromstring(html)
		except ETree.ParseError:
			created = False
		else:
			#empty html file(?)
			file = json['file']
			self.build_fragment(et_root, self.root_dir + '/' + file)
			created = True
		return created

	def get_fragment(self, fragment_id: int):
		if fragment_id not in self.identify_map:
			return None
		fragment = self.identify_map[fragment_id]
		t = fragment.to_dict(fragment_id)
		return t

	def put_fragment(self, fragment_id: int, json) -> bool:
		fragment, active = self.delete(fragment_id)
		if not self.post_fragments(json):
			self.add(fragment, active)
			update = False
		else:
			update = True
		return update

	def delete_fragment(self, fragment_id: int) -> bool:
		return self.delete(fragment_id) is not None

	def activate_page(self, page_name: str, is_activate: bool) -> bool:
		modified = False
		if is_activate:
			if page_name in self.page_deactivate_map:
				self.page_map[page_name] = self.page_deactivate_map.pop(page_name)
				modified = True
		else:
			if page_name in self.page_map:
				self.page_deactivate_map[page_name] = self.page_map.pop(page_name)
				modified = True
		return modified

	def activate_template(self, template_name: str, is_activate: bool) -> bool:
		modified = False
		if is_activate:
			if template_name in self.template_name_deactivate_map:
				self.template_name_map[template_name] = self.template_name_deactivate_map.pop(template_name)
				modified = True
		else:
			if template_name in self.template_name_map:
				self.template_name_deactivate_map[template_name] = self.template_name_map.pop(template_name)
				modified = True
		return modified

	def offer_id(self, is_template: bool) -> int:
		if is_template:
			if len(self.template_empty_id) == 0:
				self.template_id_count += 1
				return - self.template_id_count  # the id for a template is negative
			return self.template_empty_id.popleft()
		else:
			if len(self.fragment_empty_id) == 0:
				self.fragment_id_count += 1
				return self.fragment_id_count  # the id for a non-template is positive
			return self.fragment_empty_id.popleft()

	def add(self, fragment: Fragment, active=True):
		"""
			Add fragment to FragmentCollection, add/update fragment to all related data structure
		"""
		if fragment.is_template():
			# the fragment is a template
			fragment_id = self.offer_id(True)
			if active:
				self.template_name_map[fragment.file_name] = fragment
			else:
				self.template_name_deactivate_map[fragment.file_name] = fragment
		else:
			# the fragment is NOT a template
			fragment_id = self.offer_id(False)
			if fragment.class_attr in self.class_map:
				self.class_map[fragment.class_attr].add(fragment)
			else:
				temp = {fragment}
				self.class_map[fragment.class_attr] = temp

			if 'id' in fragment.etree.attrib:
				self.id_map[fragment.id_attr] = fragment

			for template in fragment.templates_attr:
				if template in self.template_map:
					self.template_map[template].add(fragment)
				else:
					temp = {fragment}
					self.template_map[template] = temp

			for label in fragment.labels_attr:
				if label in self.label_map:
					self.label_map[label].add(fragment)
				else:
					temp = {fragment}
					self.label_map[label] = temp

			for page in fragment.pages_attr:
				if page in self.page_map:
					self.page_map[page].add(fragment)
				else:
					temp = {fragment}
					self.page_map[page] = temp

		self.identify_map[fragment_id] = fragment
		save_to_file(fragment_id, fragment)

	def delete(self, fragment_id: int):
		"""
			delete a fragment, return the fragment and its activation status (always True for non-template)
		"""
		if fragment_id not in self.identify_map:
			return
		fragment = self.identify_map[fragment_id]
		del self.identify_map[fragment_id]
		delete_from_file(fragment_id, fragment)

		if fragment_id < 0:
			# the fragment is a template
			self.template_empty_id.append(fragment_id)

			if self.template_name_map.pop(fragment.file_name, None):
				active = True
			else:
				active = False
				self.template_name_deactivate_map.pop(fragment.file_name, None)
		else:
			# the fragment is NOT a template
			active = True
			self.fragment_empty_id.append(fragment_id)

			self.class_map[fragment.class_attr].remove(fragment)

			if 'id' in fragment.etree.attrib:
				del self.id_map[fragment.id_attr]

			for template in fragment.templates_attr:
				self.template_map[template].remove(fragment)

			for label in fragment.labels_attr:
				self.label_map[label].remove(fragment)

			for page in fragment.pages_attr:
				if page in self.page_deactivate_map:
					self.page_deactivate_map[page].discard(fragment)
				else:
					self.page_map[page].discard(fragment)
		return fragment, active

	def assembler(self, page, labels):
		# choose a template
		max_matching = 0
		restrict_template = []
		for _, template in self.template_name_map.items():
			if page in template.pages_attr:
				match = len(labels & set(template.labels_attr))
				if match == max_matching:
					restrict_template.append(template)
				elif match > max_matching:
					max_matching = match
					restrict_template.clear()
					restrict_template.append(template)
		if len(restrict_template) == 0:
			return "", None
		template = random.choice(restrict_template)

		template_set = self.template_map[template.file_name]  # fragments under template
		label_set = set()
		for label in labels:
			label_set |= set(self.label_map[label]) if label in self.label_map else set()
		page_set = self.page_map[page]
		restrict_set = template_set & label_set & page_set
		output_etree = copy.deepcopy(template.etree)
		del output_etree.attrib['data-label']
		del output_etree.attrib['data-page']

		joint_queue = copy.deepcopy(template.joints)
		root_queue = [output_etree] * len(joint_queue)
		while len(joint_queue) != 0:
			joint = joint_queue.pop()
			append_position = root_queue.pop()
			for i in joint.npath:
				append_position = append_position[int(i)]
			del append_position.attrib['data-child-type']
			del append_position.attrib['data-child-limit']

			child_set = set()
			for child_type in joint.child_types:
				if child_type in self.id_map:
					id_frag = self.id_map[child_type]
					if id_frag in restrict_set:
						child_set.add(id_frag)
				elif child_type in self.class_map:
					child_set |= self.class_map[child_type]

			child_set &= restrict_set
			select_frag_set = random.sample(child_set, min(joint.limit, len(child_set)))
			for select_frag in select_frag_set:
				duplication = copy.deepcopy(select_frag.etree)
				del duplication.attrib['data-label']
				del duplication.attrib['data-template']
				del duplication.attrib['data-page']

				append_position.append(duplication)
				joint_queue += select_frag.joints
				root_queue += [duplication] * len(select_frag.joints)
				restrict_set.remove(select_frag)

			pretty_xml(output_etree)
		return ETree.tostring(output_etree, 'UTF-8', 'html').decode('utf-8'), template.file_name

	def build_fragment(self, element: ETree.Element, file: str):
		if 'data-label' in element.attrib:
			# If this is a fragment root, collect its info
			attrib = element.attrib
			class_attr = attrib['class'] if 'class' in attrib else None
			id_attr = attrib['id'] if 'id' in attrib else None
			labels_attr = [label.strip() for label in attrib['data-label'].split(',')]
			templates_attr = [template.strip() for template in attrib['data-template'].split(',')] \
				if 'data-template' in attrib else []
			pages_attr = [page.strip() for page in attrib['data-page'].split(',')]
			joints = []

			f = FragmentBuilder().class_attr(class_attr) \
				.id_attr(id_attr) \
				.etree(element) \
				.joints(joints) \
				.labels_attr(labels_attr) \
				.templates_attr(templates_attr) \
				.pages_attr(pages_attr) \
				.path(file) \
				.file_name(str(os.path.basename(file)).split('.')[0]) \
				.build()

			#print(f.file_name)
			self.traverse(element, f, list(), file)
			pretty_xml(element)
			self.add(f)

		else:
			# Not a top level fragment root traverse until found
			self.traverse(element, None, list(), file)

	def traverse(self, element, fragment, npath, file):
		"""
			Traverse any intermediate structures between root and joints:
			if found another root: call build_fragment
			if found a joint, add to fragment with npath
		"""
		sub_attrib = element.attrib
		if 'data-child-type' in sub_attrib:
			# if this element is a joint
			child_type_attr = [c.strip() for c in sub_attrib['data-child-type'].split(',')]
			limit_attr = int(sub_attrib['data-child-limit'])
			fragment.joints.append(Joint(npath, child_type_attr, limit_attr))
		i = 0
		while i < len(element):
			child = element[i]
			if 'data-label' in child.attrib:
				element.remove(child)
				self.build_fragment(child, file)
			else:
				child_npath = list() if not fragment else npath + [i]
				self.traverse(child, fragment, child_npath, file)
				i += 1