#!/bin/bash
# Move to the project folder
cd ~/nobillionairesclub

# Pull the latest code from GitHub (which you pushed from your Mac)
git pull origin main

# Rebuild and restart the container
docker compose up -d --build

# Clean up old, unused images to save disk space
docker image prune -f