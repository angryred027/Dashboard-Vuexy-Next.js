export const db = {
  users: {
    profile: {
      about: [
        { property: 'Full Name', value: 'Gilves Gonzalez', icon: 'tabler-user' },
        { property: 'Status', value: 'active', icon: 'tabler-check' },
        { property: 'Role', value: 'Developer', icon: 'tabler-crown' },
        { property: 'Country', value: 'USA', icon: 'tabler-flag' },
        { property: 'Language', value: 'English', icon: 'tabler-language' }
      ],
      contacts: [
        { property: 'Contact', value: '(123) 456-7890', icon: 'tabler-phone-call' },
        { property: 'Telegram', value: 'john.doe', icon: 'tabler-messages' },
        { property: 'Email', value: 'john.doe@example.com', icon: 'tabler-mail' }
      ],
    },
  },
  profileHeader: {
    fullName: 'Gilves Gonzalez',
    location: 'Vatican City',
    joiningDate: 'April 2021',
    designation: 'UX Designer',
    profileImg: '/images/avatars/1.png',
    designationIcon: 'tabler-palette',
    coverImg: '/images/pages/profile-banner.png'
  }
}
