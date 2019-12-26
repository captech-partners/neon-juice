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
import requests
import time

# test assemble time
cs = [1, 3, 10, 30, 100, 300, 1000, 3000, 10000]
for c in cs:
    total = 0
    for _ in range(c):
        start = time.time()
        requests.get("http://54.164.20.3:5000/back-to-school/lb1")
        end = time.time()
        total += end - start
    print(c, total)

# test memory usage
# r = 0
# while r < 10000:
#     requests.get("http://localhost:5000/back-to-school/lb1")
#     r += 1
