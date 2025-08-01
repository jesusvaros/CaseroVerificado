import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabaseWrapper } from '../services/supabase/client';
import toast from 'react-hot-toast';

/**
 * AuthCallback handles the redirection coming from Supabase OAuth / Magic-Link.
 * 1. Retrieves the session from Supabase.
 * 2. Persists it in localStorage (`cv_session`).
 * 3. Inserts a row into the `session_login` table for analytics / auditing.
 * 4. Finally redirects the user to `/review/:id` (if reviewId query param exists) or home.
 */
const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const completeLogin = async () => {
      const client = supabaseWrapper.getClient();
      if (!client) {
        toast.error('Error de configuración de Supabase');
        navigate('/');
        return;
      }

      const {
        data: { session },
        error,
      } = await client.auth.getSession();

      if (error || !session) {
        toast.error('No se pudo validar la sesión.');
        navigate('/');
        return;
      }

      localStorage.setItem('cv_session', JSON.stringify(session));

      try {
        await client.from('review_session').insert({
          user_id: session.user.id,
        });
      } catch { 
        console.log('Error al insertar sesión en la base de datos');
      }

      const reviewId = searchParams.get('reviewId');

      console.log('reviewId que pasa', reviewId)
      navigate(reviewId ? `/review/${reviewId}` : '/');
    };

    completeLogin();
  }, [navigate, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-center text-sm text-gray-600">Confirmando sesión…</p>
    </div>
  );
};

export default AuthCallback;
