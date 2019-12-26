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


import os
import shutil

import click
import collections
import time
from flask import Flask, request, send_from_directory, jsonify, render_template
from model import FragmentCollection
from utils import compile_html, package
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'zip'}

app = Flask(__name__, static_url_path='/resources')
mode = 'local'

collection = FragmentCollection()
path = ''

# @app.route("/assembler")
# def home():
#     resp = flask.Response("Foo bar baz")
#     resp.headers['Access-Control-Allow-Origin'] = '*'
#     return resp

# assembler api
@app.route('/assembler/templates')
def get_all_templates():
	return jsonify(collection.get_templates()), 200


@app.route('/assembler/pages')
def get_all_pages():
	return jsonify(collection.get_pages()), 200


@app.route('/assembler/templates/<template_name>/activate')
def activate_template(template_name):
	if collection.activate_template(template_name, True):
		return '', 200
	return 'BAD INPUT PARAMETER', 400


@app.route('/assembler/templates/<template_name>/deactivate')
def deactivate_template(template_name):
	if collection.activate_template(template_name, False):
		return '', 200
	return 'BAD INPUT PARAMETER', 400


@app.route('/assembler/pages/<page_name>/activate')
def activate_page(page_name):
	if collection.activate_page(page_name, True):
		return '', 200
	return 'BAD INPUT PARAMETER', 400


@app.route('/assembler/pages/<page_name>/deactivate')
def deactivate_page(page_name):
	if collection.activate_page(page_name, False):
		return '', 200
	return 'BAD INPUT PARAMETER', 400


total_count = 0
page_count = {}
template_count = {}
time_queue = collections.deque()


@app.route('/assembler/statistics')
def statistics():
	now = time.time()
	while len(time_queue) > 0 and now - time_queue[0] > 900:  # expire in 15 minutes
		time_queue.popleft()
	s = {'total': total_count,
		 'page': page_count,
		 'template': template_count,
		 'time': len(time_queue)}
	return jsonify(s), 200



@app.route('/<page>')
def assemble(page):
    query_labels = set([c.strip() for c in request.args.get('label', '').split(',')])
    html, template = collection.assembler(page, query_labels)
    if not template:
        return 'PAGE NOT FOUND', 404
    template_count[template] = template_count.get(template, 0) + 1
    page_count[page] = page_count.get(page, 0) + 1
    global total_count
    total_count += 1
    time_queue.append(time.time())
    return html, 200


@app.route('/images/<path>')
def images(path):
	return send_from_directory('resources/images', path), 200


def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['POST'])
def upload():
	file = request.files['file']
	filename = secure_filename(file.filename)
	file.save(os.path.join('.', filename))

	shutil.unpack_archive(filename)
	start_instance(filename)


@app.route('/download')
def download():
	digest = package(collection.root_dir, '.')
	return send_from_directory('.', 'package.zip', as_attachment=True), 200


@click.version_option(0.1)
@click.group(context_settings=dict(help_option_names=['-h', '--help']))
@click.pass_context
def cli(ctx):
	"""Neon juice CLI"""
	pass


@cli.command(short_help='start neon juice instance')
@click.argument('path', type=str)
@click.option('-o', '--output-path', type=str, default='.')
def compile(path, output_path):
	print(f'compiling {path} ..')
	compile_html(path)
	print(f'packaging {path} ..')
	digest = package(path, output_path)
	print(f'packaged {path} - sha2 digest: {digest}')


@cli.command(short_help='start neon juice instance')
@click.argument('path', type=str)
@click.option('-p', '--port', type=int, default=5000)
@click.option('-l', '--local', is_flag=True, default=False)
def start(path, port, local):
	start_instance(path, port, local)


def start_instance(path, port, local):
	print(f"compiling HTML in {path}...")
	compile_html(collection, path)
	collection.root_dir = path
	if local:
		print('*local mode: routing builder APIs')

		@app.route('/fragments', methods=['POST', 'GET'])
		def get_or_post_fragments():
			if request.method == 'GET':
				query_id = [c.strip() for c in request.args.get('id', '').split(',')]
				query_labels = [c.strip() for c in request.args.get('labels', '').split(',')]
				query_templates = [c.strip() for c in request.args.get('templates', '').split(',')]
				query_pages = [c.strip() for c in request.args.get('pages', '').split(',')]
				if len(query_id) == 1 and query_id[0] == '':
					query_id = []
				if len(query_labels) == 1 and query_labels[0] == '':
					query_labels = []
				if len(query_templates) == 1 and query_templates[0] == '':
					query_templates = []
				if len(query_pages) == 1 and query_pages[0] == '':
					query_pages = []
				try:
					query_id = set([int(c) for c in query_id])
					query_labels = set(query_labels)
					query_templates = set(query_templates)
					query_pages = set(query_pages)
				except ValueError:
					return 'BAD INPUT PARAMETER', 400
				return jsonify(collection.get_fragments(query_id, query_labels, query_templates, query_pages)), 200
			elif request.method == 'POST':
				if not collection.post_fragments(request.get_json()):
					return 'INVALID INPUT/OBJECT', 400
			return 'ITEM CREATED', 201

		@app.route('/fragments/<fragment_id>', methods=['GET', 'PUT', 'DELETE'])
		def modify_fragment(fragment_id):
			try:
				fragment_id = int(fragment_id)
			except ValueError:
				return 'BAD INPUT PARAMETER', 400
			if request.method == 'GET':
				fragment_info = collection.get_fragment(fragment_id)
				if not fragment_info:
					return 'BAD INPUT PARAMETER', 400
				return jsonify(fragment_info), 200
			elif request.method == 'PUT':
				body = str(request.data)
				if not collection.put_fragment(fragment_id, request.get_json()):
					return 'INVALID INPUT/OBJECT', 400
				return "UPDATED", 200
			# elif request.method == 'OPTIONS':
			# 	response.headers.add('Access-Control-Allow-Origin', '*')
			# 	response.headers.add('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE')
			# 	return 200
			elif request.method == 'DELETE':
				if not collection.delete_fragment(fragment_id):
					return 'BAD INPUT PARAMETER', 400
				return 'DELETED', 200

	print(f"starting neon-juice instance @ port {port}...")
	app.run(host='0.0.0.0', port=port, debug=True)


if __name__ == '__main__':
	cli()
