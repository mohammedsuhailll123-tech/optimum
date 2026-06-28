import { dev } from 'astro';

console.log("Starting programmatic Astro dev server...");

try {
  await dev({
    root: './',
    server: {
      port: 4321,
      host: '127.0.0.1'
    }
  });
  console.log("Astro dev server is running on http://127.0.0.1:4321");
  
  // Keep the process alive indefinitely
  await new Promise(() => {});
} catch (error) {
  console.error("Error starting dev server:", error);
  process.exit(1);
}
