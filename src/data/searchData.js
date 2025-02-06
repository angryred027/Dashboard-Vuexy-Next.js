const data = [
  {
    id: '1',
    name: 'CRM Dashboard',
    url: '/dashboards/crm',
    icon: 'tabler-chart-pie-2',
    section: 'Dashboards'
  },
  {
    id: '2',
    name: 'Analytics Dashboard',
    url: '/dashboards/analytics',
    icon: 'tabler-trending-up',
    section: 'Dashboards'
  },
  {
    id: '3',
    name: 'eCommerce Dashboard',
    url: '/dashboards/ecommerce',
    icon: 'tabler-shopping-cart',
    section: 'Dashboards'
  },
  {
    id: '4',
    name: 'Academy Dashboard',
    url: '/dashboards/academy',
    icon: 'tabler-school',
    section: 'Dashboards'
  },
  {
    id: '5',
    name: 'Logistics Dashboard',
    url: '/dashboards/logistics',
    icon: 'tabler-truck',
    section: 'Dashboards'
  },
  {
    id: '6',
    name: 'Landing Front',
    url: '/front-pages/landing-page',
    excludeLang: true,
    icon: 'tabler-file-description',
    section: 'Front Pages'
  },
  {
    id: '7',
    name: 'Pricing Front',
    url: '/front-pages/pricing',
    excludeLang: true,
    icon: 'tabler-file-description',
    section: 'Front Pages'
  },
  {
    id: '8',
    name: 'Payment Front',
    url: '/front-pages/payment',
    excludeLang: true,
    icon: 'tabler-file-description',
    section: 'Front Pages'
  },
  {
    id: '9',
    name: 'Checkout Front',
    url: '/front-pages/checkout',
    excludeLang: true,
    icon: 'tabler-file-description',
    section: 'Front Pages'
  },
  {
    id: '10',
    name: 'Help Center Front',
    url: '/front-pages/help-center',
    excludeLang: true,
    icon: 'tabler-file-description',
    section: 'Front Pages'
  },
  {
    id: '11',
    name: 'eCommerce - Dashboard',
    url: '/apps/ecommerce/dashboard',
    icon: 'tabler-shopping-cart',
    section: 'Apps'
  },
  {
    id: '12',
    name: 'eCommerce - Product List',
    url: '/apps/ecommerce/products/list',
    icon: 'tabler-list',
    section: 'Apps'
  },
  {
    id: '13',
    name: 'eCommerce - Add New Product',
    url: '/apps/ecommerce/products/add',
    icon: 'tabler-circle-plus',
    section: 'Apps'
  },
  {
    id: '14',
    name: 'eCommerce - Product Category',
    url: '/apps/ecommerce/products/category',
    icon: 'tabler-list-details',
    section: 'Apps'
  },
  {
    id: '15',
    name: 'eCommerce - Order List',
    url: '/apps/ecommerce/orders/list',
    icon: 'tabler-list',
    section: 'Apps'
  },
  {
    id: '16',
    name: 'eCommerce - Order Details',
    url: '/apps/ecommerce/orders/details/5434',
    icon: 'tabler-list-check',
    section: 'Apps'
  },
  {
    id: '17',
    name: 'eCommerce - Customer List',
    url: '/apps/ecommerce/customers/list',
    icon: 'tabler-user',
    section: 'Apps'
  },
  {
    id: '18',
    name: 'eCommerce - Customer Details',
    url: '/apps/ecommerce/customers/details/879861',
    icon: 'tabler-list',
    section: 'Apps'
  },
  {
    id: '19',
    name: 'eCommerce - Manage Reviews',
    url: '/apps/ecommerce/manage-reviews',
    icon: 'tabler-quote',
    section: 'Apps'
  },
  {
    id: '20',
    name: 'eCommerce - Referrals',
    url: '/apps/ecommerce/referrals',
    icon: 'tabler-users-group',
    section: 'Apps'
  },
  {
    id: '21',
    name: 'eCommerce - Settings',
    url: '/apps/ecommerce/settings',
    icon: 'tabler-settings-automation',
    section: 'Apps'
  },
  {
    id: '22',
    name: 'Academy - Dashboard',
    url: '/apps/academy/dashboard',
    icon: 'tabler-book',
    section: 'Apps'
  },
  {
    id: '23',
    name: 'Academy - My Courses',
    url: '/apps/academy/my-courses',
    icon: 'tabler-list',
    section: 'Apps'
  },
  {
    id: '24',
    name: 'Academy - Course Details',
    url: '/apps/academy/course-details',
    icon: 'tabler-list',
    section: 'Apps'
  },
  {
    id: '25',
    name: 'Logistics - Dashboard',
    url: '/apps/logistics/dashboard',
    icon: 'tabler-truck',
    section: 'Apps'
  },
  {
    id: '26',
    name: 'Logistics - Fleet',
    url: '/apps/logistics/fleet',
    icon: 'tabler-car',
    section: 'Apps'
  },
  {
    id: '27',
    name: 'Email',
    url: '/apps/email',
    icon: 'tabler-mail',
    section: 'Apps'
  },
  {
    id: '28',
    name: 'Chat',
    url: '/apps/chat',
    icon: 'tabler-message-circle-2',
    section: 'Apps'
  },
  {
    id: '29',
    name: 'Calendar',
    url: '/apps/calendar',
    icon: 'tabler-calendar',
    section: 'Apps'
  },
  {
    id: '30',
    name: 'Kanban',
    url: '/apps/kanban',
    icon: 'tabler-copy',
    section: 'Apps'
  },
  {
    id: '31',
    name: 'Invoice List',
    url: '/apps/invoice/list',
    icon: 'tabler-file-description',
    section: 'Apps'
  },
  {
    id: '32',
    name: 'Invoice Preview',
    url: '/apps/invoice/preview/4987',
    icon: 'tabler-file-info',
    section: 'Apps'
  },
  {
    id: '33',
    name: 'Invoice Edit',
    url: '/apps/invoice/edit/4987',
    icon: 'tabler-file-pencil',
    section: 'Apps'
  },
  {
    id: '34',
    name: 'Invoice Add',
    url: '/apps/invoice/add',
    icon: 'tabler-file-plus',
    section: 'Apps'
  },
  {
    id: '35',
    name: 'User List',
    url: '/apps/user/list',
    icon: 'tabler-user',
    section: 'Apps'
  },
  {
    id: '36',
    name: 'User View',
    url: '/apps/user/view',
    icon: 'tabler-file-text',
    section: 'Apps'
  },
  {
    id: '37',
    name: 'Roles',
    url: '/apps/roles',
    icon: 'tabler-user-shield',
    section: 'Apps'
  },
  {
    id: '38',
    name: 'Permissions',
    url: '/apps/permissions',
    icon: 'tabler-lock',
    section: 'Apps'
  },
  {
    id: '39',
    name: 'User Profile',
    url: '/pages/user-profile',
    icon: 'tabler-user-circle',
    section: 'Pages'
  },
  {
    id: '40',
    name: 'Account Settings',
    url: '/pages/account-settings',
    icon: 'tabler-settings',
    section: 'Pages'
  },
  {
    id: '41',
    name: 'FAQ',
    url: '/pages/faq',
    icon: 'tabler-help-circle',
    section: 'Pages'
  },
  {
    id: '42',
    name: 'Pricing',
    url: '/pages/pricing',
    icon: 'tabler-currency-dollar',
    section: 'Pages'
  },
  {
    id: '43',
    name: 'Coming Soon',
    url: '/pages/misc/coming-soon',
    icon: 'tabler-clock-hour-3',
    section: 'Pages'
  },
  {
    id: '44',
    name: 'Under Maintenance',
    url: '/pages/misc/under-maintenance',
    icon: 'tabler-settings-cog',
    section: 'Pages'
  },
  {
    id: '45',
    name: 'Page Not Found - 404',
    url: '/pages/misc/404-not-found',
    icon: 'tabler-info-circle',
    section: 'Pages'
  },
  {
    id: '46',
    name: 'Not Authorized - 401',
    url: '/pages/misc/401-not-authorized',
    icon: 'tabler-user-cancel',
    section: 'Pages'
  },
  {
    id: '47',
    name: 'Login V1',
    url: '/pages/auth/login-v1',
    icon: 'tabler-login-2',
    section: 'Pages'
  },
  {
    id: '48',
    name: 'Login V2',
    url: '/pages/auth/login-v2',
    icon: 'tabler-login-2',
    section: 'Pages'
  },
  {
    id: '49',
    name: 'Register V1',
    url: '/pages/auth/register-v1',
    icon: 'tabler-user-plus',
    section: 'Pages'
  },
  {
    id: '50',
    name: 'Register V2',
    url: '/pages/auth/register-v2',
    icon: 'tabler-user-plus',
    section: 'Pages'
  },
  {
    id: '51',
    name: 'Register Multi-Steps',
    url: '/pages/auth/register-multi-steps',
    icon: 'tabler-user-plus',
    section: 'Pages'
  },
  {
    id: '52',
    name: 'Forgot Password V1',
    url: '/pages/auth/forgot-password-v1',
    icon: 'tabler-lock-check',
    section: 'Pages'
  },
  {
    id: '53',
    name: 'Forgot Password V2',
    url: '/pages/auth/forgot-password-v2',
    icon: 'tabler-lock-check',
    section: 'Pages'
  },
  {
    id: '54',
    name: 'Reset Password V1',
    url: '/pages/auth/reset-password-v1',
    icon: 'tabler-refresh',
    section: 'Pages'
  },
  {
    id: '55',
    name: 'Reset Password V2',
    url: '/pages/auth/reset-password-v2',
    icon: 'tabler-refresh',
    section: 'Pages'
  },
  {
    id: '56',
    name: 'Verify Email V1',
    url: '/pages/auth/verify-email-v1',
    icon: 'tabler-mail-check',
    section: 'Pages'
  },
  {
    id: '57',
    name: 'Verify Email V2',
    url: '/pages/auth/verify-email-v2',
    icon: 'tabler-mail-check',
    section: 'Pages'
  },
  {
    id: '58',
    name: 'Two Steps V1',
    url: '/pages/auth/two-steps-v1',
    icon: 'tabler-devices',
    section: 'Pages'
  },
  {
    id: '59',
    name: 'Two Steps V2',
    url: '/pages/auth/two-steps-v2',
    icon: 'tabler-devices',
    section: 'Pages'
  },
  {
    id: '60',
    name: 'Wizard - Checkout',
    url: '/pages/wizard-examples/checkout',
    icon: 'tabler-shopping-cart-check',
    section: 'Pages'
  },
  {
    id: '61',
    name: 'Wizard - Property Listing',
    url: '/pages/wizard-examples/property-listing',
    icon: 'tabler-building',
    section: 'Pages'
  },
  {
    id: '62',
    name: 'Wizard - Create Deal',
    url: '/pages/wizard-examples/create-deal',
    icon: 'tabler-gift',
    section: 'Pages'
  },
  {
    id: '63',
    name: 'Dialog Examples',
    url: '/pages/dialog-examples',
    icon: 'tabler-device-desktop',
    section: 'Pages'
  },
  {
    id: '64',
    name: 'Widget - Basic',
    url: '/pages/widget-examples/basic',
    icon: 'tabler-square',
    section: 'Pages'
  },
  {
    id: '65',
    name: 'Widget - Advanced',
    url: '/pages/widget-examples/advanced',
    icon: 'tabler-file-spreadsheet',
    section: 'Pages'
  },
  {
    id: '66',
    name: 'Widget - Statistics',
    url: '/pages/widget-examples/statistics',
    icon: 'tabler-align-box-bottom-center',
    section: 'Pages'
  },
  {
    id: '67',
    name: 'Widget - Charts',
    url: '/pages/widget-examples/charts',
    icon: 'tabler-chart-histogram',
    section: 'Pages'
  },
  {
    id: '68',
    name: 'Widget - Actions',
    url: '/pages/widget-examples/actions',
    icon: 'tabler-square-plus',
    section: 'Pages'
  },
  {
    id: '69',
    name: 'Form Layouts',
    url: '/forms/form-layouts',
    icon: 'tabler-layout',
    section: 'Forms & Tables'
  },
  {
    id: '70',
    name: 'Form Validation',
    url: '/forms/form-validation',
    icon: 'tabler-checkup-list',
    section: 'Forms & Tables'
  },
  {
    id: '71',
    name: 'Form Wizard',
    url: '/forms/form-wizard',
    icon: 'tabler-git-merge',
    section: 'Forms & Tables'
  },
  {
    id: '72',
    name: 'React Table',
    url: '/react-table',
    icon: 'tabler-table',
    section: 'Forms & Tables'
  },
  {
    id: '73',
    name: 'Apex Charts',
    url: '/charts/apex-charts',
    icon: 'tabler-chart-ppf',
    section: 'Charts'
  },
  {
    id: '74',
    name: 'Recharts',
    url: '/charts/recharts',
    icon: 'tabler-chart-sankey',
    section: 'Charts'
  },
  {
    id: '75',
    name: 'Menu Examples',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/menu-examples/overview`,
    icon: 'tabler-playlist-add',
    section: 'Others'
  },
  {
    id: '76',
    name: 'Typography',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/foundation/typography`,
    icon: 'tabler-typography',
    section: 'Foundation'
  },
  {
    id: '77',
    name: 'Colors',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/foundation/colors`,
    icon: 'tabler-palette',
    section: 'Foundation'
  },
  {
    id: '78',
    name: 'Shadows',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/foundation/shadows`,
    icon: 'tabler-shadow',
    section: 'Foundation'
  },
  {
    id: '79',
    name: 'Icons',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/foundation/icons`,
    icon: 'tabler-icons',
    section: 'Foundation'
  },
  {
    id: '80',
    name: 'Accordion',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components/accordion`,
    icon: 'tabler-fold',
    section: 'Components'
  },
  {
    id: '81',
    name: 'Alerts',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components/alerts`,
    icon: 'tabler-alert-triangle',
    section: 'Components'
  },
  {
    id: '82',
    name: 'Avatars',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components/avatars`,
    icon: 'tabler-user-square',
    section: 'Components'
  },
  {
    id: '83',
    name: 'Badges',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components/badges`,
    icon: 'tabler-notification',
    section: 'Components'
  },
  {
    id: '84',
    name: 'Buttons',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components/buttons`,
    icon: 'tabler-download',
    section: 'Components'
  },
  {
    id: '85',
    name: 'Button Group',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components/button-group`,
    icon: 'tabler-copy',
    section: 'Components'
  },
  {
    id: '86',
    name: 'Chips',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components/chips`,
    icon: 'tabler-oval-vertical',
    section: 'Components'
  },
  {
    id: '87',
    name: 'Dialogs',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components/dialogs`,
    icon: 'tabler-device-desktop',
    section: 'Components'
  },
  {
    id: '88',
    name: 'List',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components/list`,
    icon: 'tabler-list',
    section: 'Components'
  },
  {
    id: '89',
    name: 'Menu',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components/menu`,
    icon: 'tabler-menu-2',
    section: 'Components'
  },
  {
    id: '90',
    name: 'Pagination',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components/pagination`,
    icon: 'tabler-chevron-right-pipe',
    section: 'Components'
  },
  {
    id: '91',
    name: 'Progress',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components/progress`,
    icon: 'tabler-progress',
    section: 'Components'
  },
  {
    id: '92',
    name: 'Ratings',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components/ratings`,
    icon: 'tabler-star',
    section: 'Components'
  },
  {
    id: '93',
    name: 'Snackbar',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components/snackbar`,
    icon: 'tabler-message-dots',
    section: 'Components'
  },
  {
    id: '94',
    name: 'Swiper',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components/swiper`,
    icon: 'tabler-cards',
    section: 'Components'
  },
  {
    id: '95',
    name: 'Tabs',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components/tabs`,
    icon: 'tabler-layout-navbar',
    section: 'Components'
  },
  {
    id: '96',
    name: 'Timeline',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components/timeline`,
    icon: 'tabler-timeline',
    section: 'Components'
  },
  {
    id: '97',
    name: 'Toasts',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components/toasts`,
    icon: 'tabler-bell',
    section: 'Components'
  },
  {
    id: '98',
    name: 'More Components',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components/more`,
    icon: 'tabler-table-plus',
    section: 'Components'
  },
  {
    id: '99',
    name: 'Text Field',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements/text-field`,
    icon: 'tabler-forms',
    section: 'Forms & Tables'
  },
  {
    id: '100',
    name: 'Select',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements/select`,
    icon: 'tabler-list-details',
    section: 'Forms & Tables'
  },
  {
    id: '101',
    name: 'Checkbox',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements/checkbox`,
    icon: 'tabler-checkbox',
    section: 'Forms & Tables'
  },
  {
    id: '102',
    name: 'Radio',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements/radio`,
    icon: 'tabler-circle-dot',
    section: 'Forms & Tables'
  },
  {
    id: '103',
    name: 'Custom Inputs',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements/custom-inputs`,
    icon: 'tabler-list-details',
    section: 'Forms & Tables'
  },
  {
    id: '104',
    name: 'Textarea',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements/textarea`,
    icon: 'tabler-rectangle',
    section: 'Forms & Tables'
  },
  {
    id: '105',
    name: 'Autocomplete',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements/autocomplete`,
    icon: 'tabler-list-check',
    section: 'Forms & Tables'
  },
  {
    id: '106',
    name: 'Date & Time Pickers',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements/pickers`,
    icon: 'tabler-calendar-month',
    section: 'Forms & Tables'
  },
  {
    id: '107',
    name: 'Switch',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements/switch`,
    icon: 'tabler-toggle-left',
    section: 'Forms & Tables'
  },
  {
    id: '108',
    name: 'File Uploader',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements/file-uploader`,
    icon: 'tabler-file-upload',
    section: 'Forms & Tables'
  },
  {
    id: '109',
    name: 'Editor',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements/editor`,
    icon: 'tabler-device-ipad-horizontal-plus',
    section: 'Forms & Tables'
  },
  {
    id: '110',
    name: 'Slider',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements/slider`,
    icon: 'tabler-line',
    section: 'Forms & Tables'
  },
  {
    id: '111',
    name: 'MUI Tables',
    url: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/mui-table`,
    icon: 'tabler-layout-board-split',
    section: 'Forms & Tables'
  }
]

export default data
