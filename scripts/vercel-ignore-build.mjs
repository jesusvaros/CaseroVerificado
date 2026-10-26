const ref = process.env.VERCEL_GIT_COMMIT_REF ?? '';

if (ref.startsWith('auto-blog-posts-')) {
  console.log(`Skipping the generated blog preview deployment for ${ref}.`);
  process.exit(0);
}

console.log(`Keeping the deployment for ${ref || 'an unknown branch'}.`);
process.exit(1);
