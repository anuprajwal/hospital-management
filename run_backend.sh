#!/usr/bin/env bash
# Run backend from project root so "backend" package resolves.
cd "$(dirname "$0")"
export PYTHONPATH="$PWD"
./backend/venv/bin/python backend/server.py
