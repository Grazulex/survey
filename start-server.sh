#!/bin/bash

# BNP Paribas Fortis Survey - Development Server Launcher
# Simple script to start a local development server

PORT=8080
BROWSER_COMMAND=""

# Detect OS and set browser command
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    BROWSER_COMMAND="xdg-open"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    BROWSER_COMMAND="open"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    BROWSER_COMMAND="start"
fi

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║     BNP Paribas Fortis - Kata Survey Development Server     ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "Starting development server on port $PORT..."
echo ""

# Check if port is already in use
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Warning: Port $PORT is already in use!"
    echo "   Please stop the existing server or use a different port."
    echo ""
    read -p "Press Enter to exit..."
    exit 1
fi

# Start server
echo "✅ Server started successfully!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌐 Access the application at:"
echo ""
echo "   Survey:  http://localhost:$PORT/index.html"
echo "   Results: http://localhost:$PORT/results.html"
echo "   Admin:   http://localhost:$PORT/admin.html"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Open browser (if available)
if [ -n "$BROWSER_COMMAND" ]; then
    sleep 2
    $BROWSER_COMMAND "http://localhost:$PORT/index.html" 2>/dev/null &
fi

# Start Python HTTP server
python3 -m http.server $PORT
