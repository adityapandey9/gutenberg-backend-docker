# Use Bun's official base image
FROM oven/bun:1.0

# Set working directory
WORKDIR /app

# Copy package and lock files first (for caching)
COPY bun.lockb package.json ./

# Install deps
RUN bun install

# Copy source code
COPY . .

# Expose the port (default: 3000)
EXPOSE 3000

# Start app
CMD ["bun", "run", "start"]
