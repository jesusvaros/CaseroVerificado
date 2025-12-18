import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../store/auth/hooks';
import ContactModal from '../ui/ContactModal';
import { addBlogComment, fetchBlogComments, type BlogComment } from '../../services/supabase/blogComments';
import { showErrorToast, showSuccessToast } from '../ui/toast/toastUtils';
import { trackUmamiEvent } from '../../utils/analytics';

type BlogCommentsSectionProps = {
  postSlug: string;
  postTitle: string;
};

function formatDisplayDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

const BlogCommentsSection: React.FC<BlogCommentsSectionProps> = ({ postSlug, postTitle }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchBlogComments(postSlug)
      .then(data => {
        if (isMounted) setComments(data);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [postSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = newComment.trim();
    if (trimmed.length < 3) {
      showErrorToast('Escribe al menos 3 caracteres para publicar tu comentario.');
      return;
    }

    if (!user) {
      setIsLoginModalOpen(true);
      trackUmamiEvent('blog:comment-login-open', { slug: postSlug });
      return;
    }

    setIsSubmitting(true);
    const authorName =
      user.user_metadata?.full_name ||
      (user.email ? user.email.split('@')[0] : null);

    const { comment, error } = await addBlogComment({
      postSlug,
      content: trimmed,
      user,
      authorName,
    });

    setIsSubmitting(false);

    if (error || !comment) {
      showErrorToast(error || 'No se pudo publicar el comentario.');
      return;
    }

    setComments(prev => [comment, ...prev]);
    setNewComment('');
    trackUmamiEvent('blog:comment-posted', { slug: postSlug });
    showSuccessToast('Comentario publicado');
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    showSuccessToast('Sesión iniciada, ahora puedes comentar.');
    textareaRef.current?.focus();
  };

  return (
    <section className="mt-12 rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Comentarios</h2>
          <p className="text-sm text-gray-600">Comparte dudas o experiencias sobre "{postTitle}".</p>
        </div>
        <span className="text-sm font-medium text-gray-600">
          {comments.length} {comments.length === 1 ? 'comentario' : 'comentarios'}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <label className="sr-only" htmlFor="blog-comment">Añadir comentario</label>
        <textarea
          id="blog-comment"
          ref={textareaRef}
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          rows={4}
          className="w-full rounded-2xl border border-gray-200 bg-white p-4 text-gray-800 shadow-inner focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          placeholder={user ? 'Escribe tu comentario aquí...' : 'Inicia sesión para comentar'}
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-600">
            {user ? (
              <>Comentando como <span className="font-semibold text-gray-800">{user.email || 'usuario'}</span></>
            ) : (
              'Necesitas iniciar sesión para publicar un comentario.'
            )}
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-300"
          >
            {isSubmitting ? 'Publicando...' : user ? 'Publicar comentario' : 'Inicia sesión para comentar'}
          </button>
        </div>
      </form>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
          </div>
        ) : comments.length === 0 ? (
          <div className="rounded-2xl bg-white p-4 text-sm text-gray-600">
            Aún no hay comentarios. Sé el primero en participar.
          </div>
        ) : (
          comments.map(comment => (
            <article key={comment.id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-800">
                    {(comment.author_name || 'U?').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {comment.author_name || 'Usuario anónimo'}
                      {user && user.id === comment.user_id ? ' (tú)' : ''}
                    </p>
                    <p className="text-xs text-gray-500">{formatDisplayDate(comment.created_at)}</p>
                  </div>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-gray-800">{comment.content}</p>
            </article>
          ))
        )}
      </div>

      {isLoginModalOpen && (
        <ContactModal
          onClose={() => setIsLoginModalOpen(false)}
          onUserLoggedIn={handleLoginSuccess}
          redirectToHomeIfNoSession={false}
          showInfo={false}
        />
      )}
    </section>
  );
};

export default BlogCommentsSection;
