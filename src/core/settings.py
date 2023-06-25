import datetime
from os import getenv
from pathlib import Path

from django.urls import reverse_lazy
from dotenv import load_dotenv

import django

from django.utils.encoding import smart_str
django.utils.encoding.smart_text = smart_str

from django.utils.translation import gettext
django.utils.translation.ugettext = gettext

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / '../.env')

SECRET_KEY = getenv('DJANGO_SECRET_KEY')
DEBUG = getenv('DJANGO_DEBUG').lower() in ('true', 'on', '1')
ALLOWED_HOSTS = getenv('DJANGO_ALLOWED_HOSTS').split()

INSTALLED_APPS = [
	'django.contrib.admin',
	'django.contrib.auth',
	'django.contrib.contenttypes',
	'django.contrib.sessions',
	'django.contrib.messages',
	'django.contrib.staticfiles',

	'rest_framework',
	'rest_framework_jwt',
	'corsheaders',

	'user.apps.UserConfig',
	'music.apps.MusicConfig'
]

MIDDLEWARE = [
	'django.middleware.security.SecurityMiddleware',
	'django.contrib.sessions.middleware.SessionMiddleware',
	'django.middleware.common.CommonMiddleware',
	'django.middleware.csrf.CsrfViewMiddleware',
	'django.contrib.auth.middleware.AuthenticationMiddleware',
	'django.contrib.messages.middleware.MessageMiddleware',
	'django.middleware.clickjacking.XFrameOptionsMiddleware',
	'corsheaders.middleware.CorsMiddleware'
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
	{
		'BACKEND': 'django.template.backends.django.DjangoTemplates',
		'DIRS': [],
		'APP_DIRS': True,
		'OPTIONS': {
			'context_processors': [
				'django.template.context_processors.debug',
				'django.template.context_processors.request',
				'django.contrib.auth.context_processors.auth',
				'django.contrib.messages.context_processors.messages',
			],
		},
	},
]

WSGI_APPLICATION = 'core.wsgi.application'


DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.sqlite3',
		'NAME': BASE_DIR / '../db.sqlite3',
	}
}


AUTH_PASSWORD_VALIDATORS = [
	{
		'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
	},
]


LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'static'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

if DEBUG:
	SHELL_PLUS_PRINT_SQL = True

AUTH_USER_MODEL = 'user.User'

MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
EMAIL_PORT = 1025

LOGIN_REDIRECT_URL = reverse_lazy('index')

CORS_ORIGIN_ALLOW_ALL = False

CORS_ORIGIN_WHITELIST = ('http://localhost:8888', 'http://localhost:3000', 'http://localhost:5173')
CSRF_TRUSTED_ORIGINS = ('http://localhost:8888', 'http://localhost:3000', 'http://localhost:5173')

REST_FRAMEWORK = {
	'DEFAULT_PERMISSION_CLASSES': (
		'rest_framework.permissions.IsAuthenticated',
	),
	'DEFAULT_AUTHENTICATION_CLASSES': (
		'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
		'rest_framework.authentication.SessionAuthentication',
		'rest_framework.authentication.BasicAuthentication',
	),
}

JWT_AUTH = {
	'JWT_SECRET_KEY': SECRET_KEY,
	'JWT_ALGORITHM': 'HS256',
	'JWT_ALLOW_REFRESH': True,
	'JWT_EXPIRATION_DELTA': datetime.timedelta(days=1),
	'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=7),
}