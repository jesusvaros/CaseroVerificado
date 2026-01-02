import { Link } from 'react-router-dom';
import type { StaticBlogPost } from '../../blog/posts';

interface RelatedLinksCardProps {
  posts: StaticBlogPost[];
  className?: string;
}

export default function RelatedLinksCard({ posts, className = '' }: RelatedLinksCardProps) {
  if (posts.length === 0) return null;

  return (
    <div className={`my-8 ${className}`}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group block rounded-lg border border-gray-200 bg-white overflow-hidden transition-shadow hover:shadow-md hover:border-emerald-300"
          >
            {post.heroImageUrl && (
              <div className="aspect-video bg-gray-100">
                <img 
                  src={post.heroImageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h4 className="mb-2 text-sm font-medium text-gray-900 group-hover:text-emerald-700">
                {post.title}
              </h4>
              <div className="flex items-center text-xs text-gray-500">
                {post.publishedAt && (
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </time>
                )}
                {post.readingMinutes && (
                  <span className="ml-2">
                    • {post.readingMinutes} min
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
