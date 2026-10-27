-- Rejecting a review also takes it off the site: before, a review rejected after it was
-- published kept is_public = true and stayed visible.

create or replace function public.reject_review(p_session_id uuid, p_reason text default null) returns void
  language plpgsql security definer
  set search_path = public
  as $$
begin
  if not coalesce(public.is_admin(), false) then
    raise exception 'not allowed';
  end if;
  update review_sessions
  set status = 'rejected', rejection_reason = nullif(trim(p_reason), '')
  where id = p_session_id;
  update public_reviews set is_public = false where review_session_id = p_session_id;
end;
$$;

-- Hide the reviews that were rejected while already published.
update public_reviews pr
set is_public = false
from review_sessions rs
where rs.id = pr.review_session_id and rs.status = 'rejected' and pr.is_public;
