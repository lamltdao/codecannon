export const SECTION_OPTIONS = {
  courses: 'courses',
  blog: 'blog',
  contests: 'contest',
  logo: 'logo',
  aboutUs: 'aboutUs',
};

export const COURSE_SIDEBAR_OPTIONS = {
  home: {
    studentAccessible: true,
    url: () => '',
    pathnameRegex: /^\/courses\/\d+(\/(edit)?)?$/,
  },
  threads: {
    studentAccessible: true,
    url: () => 'threads',
    pathnameRegex: /^\/courses\/\d+\/threads/,
  },
  materials: {
    studentAccessible: true,
    url: (folderId) => `materials/${folderId}`,
    pathnameRegex: /^\/courses\/\d+\/materials\//,
  },
  members: {
    studentAccessible: false,
    url: () => 'members',
    pathnameRegex: /^\/courses\/\d+\/members/,
  },
};

export const BORDER_LIGHT_GREY = '#c6c6c6';
export const INPUT_DISABLED_BACKGROUND = '#eeeeee';
export const BUTTON_BOX_SHADOW = '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)';
export const RECAPTCHA_BOX_HEIGHT = 74;
export const DEFAULT_COURSE_COVER_IMAGE = 'https://images.pexels.com/photos/459203/pexels-photo-459203.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
export const ALLOWED_MARKDOWN_ELEMENTS = ['h1', 'h2', 'h3', 'p', 'em', 'strong', 'ul', 'ol', 'li', 'blockquote', 'a'];
