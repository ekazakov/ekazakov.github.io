#!/bin/bash
docker run -id -v $(pwd)/src:/blog/src -p 4001:4001 ekazakov/blog