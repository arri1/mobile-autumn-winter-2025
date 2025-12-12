# Memory Bank - Mobile App Project

## Project Overview
React Native mobile application built with Expo, using modern React patterns and state management. The app demonstrates React hooks usage (useState, useEffect, useMemo) and Zustand for global state management.

## Tech Stack

### Core Technologies
- **React Native**: 0.79.6
- **React**: 19.0.0
- **Expo**: ~53.0.22
- **Zustand**: ^5.0.2 (State management)
- **React Navigation**: 
  - @react-navigation/native: ^7.1.17
  - @react-navigation/bottom-tabs: ^7.4.7
  - @react-navigation/stack: ^7.1.1
- **styled-components**: ^6.1.19 (Styling)
- **axios**: ^1.7.9 (HTTP client)
- **AsyncStorage**: ^2.2.0 (Local storage)

### Development Tools
- **ESLint**: ^9.35.0 (Code linting)
- **Prettier**: ^3.6.2 (Code formatting)
- **Babel**: ^7.25.2 (Transpilation)

## Project Structure

```
mobile-app/
├── App.js                    # Root component with navigation setup
├── index.js                  # Entry point
├── src/
│   ├── navigation/
│   │   ├── AuthNavigator.js  # Stack navigator for auth screens
│   │   └── RootTabs.js       # Bottom tab navigator for main app
│   ├── screens/
│   │   ├── Auth/
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   ├── Settings/
│   │   │   ├── SettingsScreen.js
│   │   │   └── Settings.styles.js  # Separated styles
│   │   ├── UseStateLab/
│   │   ├── UseEffectLab/
│   │   ├── UseMemoLab/
│   │   ├── ZustandLab/
│   │   └── Users/
│   ├── store/
│   │   ├── authStore.js      # Zustand store for authentication
│   │   └── useStore.js       # Shared Zustand store (theme, counter, etc.)
│   └── services/
│       └── api.js            # API service with axios interceptors
```

## Architecture Patterns

### State Management
- **Zustand** stores:
  - `authStore`: Authentication state (user, tokens, isAuthenticated)
  - `useStore`: Shared app state (theme, counter, enabled flags)

### Navigation
- **Conditional Navigation**: App.js checks `isAuthenticated` from authStore
  - If authenticated → `RootTabs` (bottom tab navigator)
  - If not authenticated → `AuthNavigator` (stack navigator)

### Styling Pattern
- **styled-components** for component styling
- **Recent refactoring**: Styles separated into `.styles.js` files
  - Example: `SettingsScreen.js` uses `Settings.styles.js`
  - All styled components exported from styles file

### API Service Pattern
- Centralized API service (`src/services/api.js`)
- Base URL: `https://cloud.kit-imi.info`
- Axios interceptors for:
  - Automatic token attachment to requests
  - Automatic token refresh on 401 errors
  - Error handling and transformation

## API Endpoints

```
Base URL: https://cloud.kit-imi.info

- GET  /api/health              # Health check
- POST /api/auth/register       # User registration
- POST /api/auth/login          # User login
- GET  /api/auth/profile        # Get user profile
- POST /api/auth/refresh        # Refresh access token
- POST /api/auth/logout         # User logout
- GET  /api/auth/users          # Get users list (Admin only)
```

## Authentication Flow

1. **Login/Register**: User credentials → API → Store tokens in AsyncStorage
2. **Token Management**: 
   - Access token + Refresh token stored in AsyncStorage
   - Access token attached to all API requests via interceptor
   - Automatic refresh on 401 errors
3. **Logout**: Clear tokens from AsyncStorage and reset auth state

## Store Details

### authStore (src/store/authStore.js)
State:
- `user`: Current user object
- `accessToken`: JWT access token
- `refreshToken`: JWT refresh token
- `isAuthenticated`: Boolean authentication status
- `isLoading`: Loading state
- `error`: Error message

Actions:
- `initializeAuth()`: Load auth state from AsyncStorage
- `register(userData)`: Register new user
- `login(credentials)`: Login user
- `getProfile()`: Fetch user profile
- `getUsers(params)`: Fetch users list (admin)
- `logout()`: Logout and clear state

### useStore (src/store/useStore.js)
Shared application state:
- `count`: Counter value
- `name`: User name
- `theme`: 'dark' | 'light'
- `enabled`: Boolean toggle
- `inputValue`: Text input value

## Screen Structure

### Main App Screens (Bottom Tabs)
1. **useState** - useState hook demonstration
2. **useEffect** - useEffect hook demonstration
3. **useMemo** - useMemo hook demonstration
4. **zustand** - Zustand state management demo
5. **users** - Users list screen
6. **settings** - App settings and user profile

### Auth Screens (Stack Navigator)
1. **Login** - User login
2. **Register** - User registration

## Recent Changes (2024)

### Settings Screen Refactoring
- **Before**: All styles defined inline in SettingsScreen.js using styled-components
- **After**: Styles extracted to separate file `Settings.styles.js`
- **Benefits**: Better separation of concerns, easier maintenance
- **Components exported**: SafeArea, Container, Header, Title, Subtitle, UserInfo, UserName, UserEmail, SectionTitle, Card, CardHeader, CardTitle, Divider, SettingRow, SettingInfo, SettingLabel, SettingDescription, LogoutButton, LogoutButtonText

## Color Scheme

### Dark Theme (Primary)
- Background: `#0b0c10` (Main background)
- Card background: `#1a1a1a`
- Border: `#1c2230`, `#2a2a2a`
- Text primary: `#ffffff`
- Text secondary: `#9aa4b2`
- Accent: `#5eead4` (Teal/cyan)
- Error/Danger: `#dc2626` (Red)

### Navigation Colors
- Header background: `#0D0F14`
- Header text: `#E6E9EF`
- Tab bar background: `#0D0F14`
- Tab bar border: `#1C2230`
- Active tab: `#5EEAD4`
- Inactive tab: `#9AA4B2`

## Code Style & Standards

### Linting
- ESLint with React, React Hooks, and React Native plugins
- Prettier for code formatting
- Max warnings: 0 (strict mode)
- No inline styles allowed (enforced by eslint-plugin-no-inline-styles)

### Scripts
- `npm start`: Start Expo development server
- `npm run android`: Start on Android
- `npm run ios`: Start on iOS
- `npm run web`: Start web version
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier
- `npm run format:check`: Check formatting

## Best Practices

1. **State Management**: Use Zustand stores for global state
2. **API Calls**: Always use apiService from `src/services/api.js`
3. **Styling**: Use styled-components, keep styles separate in `.styles.js` files
4. **Navigation**: Use React Navigation hooks (useNavigation, useRoute)
5. **Error Handling**: Handle errors in try-catch blocks, show user-friendly messages
6. **Async Operations**: Always use async/await with proper error handling
7. **Storage**: Use AsyncStorage via Zustand stores, not directly in components

## Common Issues & Solutions

### Token Refresh
- API interceptor automatically handles token refresh on 401
- If refresh fails, tokens are cleared and user is logged out

### Navigation
- App checks `isAuthenticated` on mount
- Navigation structure changes based on auth state

### Styling
- All styled components must be imported from styles files
- Use consistent color scheme from this memory bank

## Dependencies Notes

- React 19.0.0 (latest)
- React Native 0.79.6 (very recent)
- Expo SDK 53 (latest stable)
- Zustand 5.x (latest major version)

## Testing Notes

- No test framework configured yet
- Manual testing through Expo Go app
- API backend: `https://cloud.kit-imi.info`

## Future Improvements

- Consider adding unit tests (Jest + React Native Testing Library)
- Add TypeScript for type safety
- Implement error boundary components
- Add loading states and skeletons
- Enhance error messages and user feedback

