import type { User } from '@supabase/supabase-js';
import { supabaseWrapper } from './client';

export type BlogComment = {
  id: string;
  post_slug: string;
  user_id: string;
  author_name: string | null;
  content: string;
  created_at: string;
};

export async function fetchBlogComments(postSlug: string): Promise<BlogComment[]> {
  const client = supabaseWrapper.getClient();
  if (!client || !postSlug) return [];

  const { data, error } = await client
    .from('blog_comments')
    .select('id, post_slug, user_id, author_name, content, created_at')
    .eq('post_slug', postSlug)
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error('Error fetching blog comments', error);
    return [];
  }

  return data as BlogComment[];
}

export async function addBlogComment({
  postSlug,
  content,
  user,
  authorName,
}: {
  postSlug: string;
  content: string;
  user: User;
  authorName?: string | null;
}): Promise<{ comment?: BlogComment; error?: string }> {
  const client = supabaseWrapper.getClient();
  if (!client) return { error: 'Supabase no está configurado.' };
  if (!user) return { error: 'Debes iniciar sesión para comentar.' };

  const body = (content || '').trim();
  if (body.length < 3) return { error: 'El comentario es demasiado corto.' };

  const normalizedAuthor = authorName?.trim();

  const { data, error } = await client
    .from('blog_comments')
    .insert({
      post_slug: postSlug,
      content: body.slice(0, 2000),
      user_id: user.id,
      author_name: normalizedAuthor ? normalizedAuthor.slice(0, 120) : null,
    })
    .select('id, post_slug, user_id, author_name, content, created_at')
    .single();

  if (error || !data) {
    console.error('Error creating blog comment', error);
    return { error: error?.message || 'No se pudo enviar el comentario.' };
  }

  return { comment: data as BlogComment };
}
