import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Register = () => {
    const [ form, setForm ] = useState({ email: '', firstname: '', lastname: '', password: '' });
    const [ submitting, setSubmitting ] = useState(false);
    const navigate = useNavigate();


    function handleChange(e) {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [ name ]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);

        try {
            await api.post('/api/auth/register', {
                email: form.email,
                fullName: {
                    firstName: form.firstname,
                    lastName: form.lastname
                },
                password: form.password
            }, {
                withCredentials: true
            });

            // Check if registration was successful and we got a token
            const cookies = document.cookie.split(';').map(c => c.trim());
            const hasToken = cookies.some(c => c.startsWith('token='));

            if (hasToken) {
                navigate("/home");
            } else {
                alert('Registration failed: no authentication token received');
            }
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    }

    // No automatic redirect on register page load

    return (
        <div className="center-min-h-screen">
            <div className="auth-card" role="main" aria-labelledby="register-heading">
                <header className="auth-header">
                    <h1 id="register-heading">Create account</h1>
                    <p className="auth-sub">Join us and start exploring.</p>
                </header>
                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    <div className="field-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="grid-2">
                        <div className="field-group">
                            <label htmlFor="firstname">First name</label>
                            <input id="firstname" name="firstname" placeholder="Jane" value={form.firstname} onChange={handleChange} required />
                        </div>
                        <div className="field-group">
                            <label htmlFor="lastname">Last name</label>
                            <input id="lastname" name="lastname" placeholder="Doe" value={form.lastname} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="field-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" autoComplete="new-password" placeholder="Create a password" value={form.password} onChange={handleChange} required minLength={6} />
                    </div>
                    <button type="submit" className="primary-btn" disabled={submitting}>
                        {submitting ? 'Creating...' : 'Create Account'}
                    </button>
                </form>
                <p className="auth-alt">
                    Already have an account?{' '}
                    <span 
                        onClick={() => navigate('/login')}
                        style={{ 
                            color: 'var(--color-primary)',
                            fontWeight: 'var(--font-weight-medium)',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            display: 'inline-block',
                            padding: '4px'
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyPress={(e) => e.key === 'Enter' && navigate('/login')}
                    >
                        Sign in
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;

