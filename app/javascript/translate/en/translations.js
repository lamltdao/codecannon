export default {
  common: {
    login: 'Login',
    signUp: 'Sign Up',
    logout: 'Log Out',
    editPassword: 'Edit Password',
  },

  landing: {
    msg: 'Welcome to codecannon.net',
  },

  authentication: {
    username: 'Username',
    password: 'Password',
    passCfm: 'Confirm Password',
    submit: "Let's go!",
    remember: 'Remember me',
    signUpRedir: "Haven't signed up yet? Click ",
    loginRedir: 'Already have an account? Login ',
    here: 'here',
    loginSuccessMsg: 'Logged in!',
    signUpSuccessMsg: 'Signed up successfully!',
    login: 'E-mail or username',
    loginFailedAlert: 'Your username/email or password is invalid',
    resetPasswordRedir: 'Forgot your password?',
    newPassword: 'New password',
    confirmNewPassword: 'Confirm new password',
    editPasswordSuccessMsg: 'Password successfully changed',
  },

  email: {
    account_confirmation: {
      msg: 'Please verify your account by the link that has been sent to your Email',
      resend_reminder: 'Not received the email ? Enter your email below so that we can send another link',
    },
    forgot_password: {
      msg: 'Enter your email to change password',
      resend_reminder: 'Not received the email ? Click Send again to receive another one',
    },
    textfieldPlaceholder: 'Enter your email here',
    buttonPlaceholder: 'Send',
  },

  home: {
    welcome: 'Welcome, ',
    learn: 'Learn',
    compete: 'Compete',
    blog: 'Blog',
    aboutUs: 'About Us',
    admPortal: 'AdmPortal',
    admCourse: 'Courses you manage',
    lrnCourse: 'Courses you participate',
    noCoursesMsg: "You haven't signed up to any courses yet.",
    featureInDev: "We're still working on this feature, so check back later!",
  },

  admin: {
    newCourseTitle: 'Create a new Course',
    courseName: 'Course name',
    adminUsername: 'Username of admin',
    submit: 'Submit',
    courseLanguage: 'Course Language:',
    english: 'English',
    vietnamese: 'Vietnamese',
    back: 'Back',
    courseCreatedMsg: 'Use the link below to access this course. This link has also been emailed to the course admin:',
  },

  course: {
    defaultWelcomeMsg: (courseName) => `Welcome to ${courseName}!`,
    defaultOverview: '**Mark***down* is ***supported***!',
    sidebar: {
      home: 'Home',
      threads: 'Discussions',
      materials: 'Materials',
      members: 'Members',
    },
    navbar: {
      manage: 'Manage course: ',
      loggedInAs: 'Logged in as ',
      profile: 'Your profile',
      settings: 'Settings',
      report: 'Report a Problem',
      siteHome: 'Home',
    },
    home: {
      editBtn: 'Edit Page',
      mentor: 'Course Mentor',
      editPageTitle: 'Edit Course Homepage',
      courseName: 'Name of Course',
      welcomeTitle: 'Welcome Message',
      welcomeHelpText: 'Give your students a warm welcome...',
      ovrTitle: 'Course Overview',
      ovrHelpText: 'Tell your students about your course...',
      save: 'Save',
      cancel: 'Cancel',
      confirmCancel: 'Discard all changes?',
    },
    threads: {
      threadTitle: 'Thread Title',
      mentor: 'Course Mentor',
      threadContent: 'Thread Content',
      threadTitleHelpText: 'Give a name to this thread...',
      threadContentHelpText: 'What does this thread do?',
      save: 'Save',
      cancel: 'Cancel',
      confirmCancel: 'Discard all changes?',
      updated: 'Updated',
      comments: 'Comments',
      noComment: 'No comment',
      commentPlaceholder: 'Write your comment here',
      replyPlaceholder: 'Write your reply here',
      noThreads: 'No Threads Yet',
      new: {
        newBtn: 'New Thread',
        newPageTitle: 'New Thread',
      },
      edit: {
        editThreadTitle: 'Edit Thread - ',
        confirmArchive: 'Discard all changes?',
      },
    },
    member: {
      pageTitle: 'Course Members',
      adminListTitle: 'Admins & Moderators',
      partiListTitle: 'Participants',
      user: 'User',
      addMember: 'Add member',
      cancel: 'Cancel',
      addMemberTextFieldPlaceholder: 'abc@gmail.com, cde@gmail.com',
      addMemberMessage: 'Student Email(s), separated by comma:',
    },
    materials: {
      folders: 'Folders',
      noFolder: 'No Folder',
      files: 'Files',
      noFile: 'No File',
      newFolder: 'New Folder',
      uploadFile: 'Upload',
      newFolderMessage: 'This folder will be saved in ',
      uploadFileMessage: 'This file will be saved in ',
      newFolderTextFieldPlaceholder: 'Give it a nice name ...',
      cancel: 'Cancel',
      save: 'Save',
      dropzoneMessageWhenDrag: 'Drop files here ...',
      dropzoneMessageWhenUndrag: 'Drag and drop here to upload new files. Or click to open a dialog.',
      deleteFolder: 'Delele this folder',
    },
  },

  profile: {
    firstName: 'First name',
    lastName: 'Last name',
    username: 'Username',
    nationality: 'Nationality',
    birthyear: 'Year of birth',
    showProfile: {
      pageTitle: 'Profile',
      institution: 'Institution',
      linkToEdit: 'Edit your profile',
    },
    editProfile: {
      pageTitle: 'Edit Profile',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmNewPassword: 'Confirm new Password',
      uploadNewAvatar: 'Upload your new avatar',
      saveButton: 'Save',
      backButton: 'Back',
    },
  },
};
