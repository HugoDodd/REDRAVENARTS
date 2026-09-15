#!/bin/bash
# Move to the directory where this script is saved
cd "$(dirname "$0")"

# Run the python build script
python3 build.py

# Keep window open so he can read the success message
echo ""
echo "--------------------------------------------------"
echo "✅ Build complete! You can close this window now."
echo "--------------------------------------------------"
read -p "Press Enter to exit..."