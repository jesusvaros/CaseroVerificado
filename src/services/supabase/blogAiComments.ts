import { supabaseWrapper } from './client';

export type BlogAiComment = {
  id: string;
  post_slug: string;
  ordinal: number;
  author_name: string | null;
  content: string;
  created_at: string;
  is_auto: boolean;
};

export async function fetchBlogAiComments(postSlug: string): Promise<BlogAiComment[]> {
  const client = supabaseWrapper.getClient();
  if (!client || !postSlug) return [];

  const { data, error } = await client
    .from('blog_ai_comments')
    .select('id, post_slug, ordinal, author_name, content, created_at, is_auto')
    .eq('post_slug', postSlug)
    .order('created_at', { ascending: false });

  if (error || !data) {
    console.error('Error fetching AI blog comments', error);
    return [];
  }

  return data as BlogAiComment[];
}

export async function deleteBlogAiComments(postSlug: string): Promise<boolean> {
  const client = supabaseWrapper.getClient();
  if (!client || !postSlug) return false;

  const { error } = await client
    .from('blog_ai_comments')
    .delete()
    .eq('post_slug', postSlug);

  if (error) {
    console.error('Error deleting AI comments:', error);
    return false;
  }
  
  return true;
}

export async function upsertBlogAiComments(
  postSlug: string,
  comments: Array<{ ordinal: number; author_name: string | null; content: string; created_at?: string }>
): Promise<BlogAiComment[]> {
  const client = supabaseWrapper.getClient();
  if (!client || !postSlug || comments.length === 0) return [];

  const payload = comments.map(comment => ({
    post_slug: postSlug,
    ordinal: comment.ordinal,
    author_name: comment.author_name,
    content: comment.content,
    is_auto: true,
    created_at: comment.created_at,
  }));

  const { data, error } = await client
    .from('blog_ai_comments')
    .upsert(payload, { onConflict: 'post_slug,ordinal' })
    .select('id, post_slug, ordinal, author_name, content, created_at, is_auto')
    .order('ordinal', { ascending: true });

  if (error || !data) {
    console.error('Error upserting AI blog comments', error);
    return [];
  }

  return data as BlogAiComment[];
}
