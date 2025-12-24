import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    
    // --- Header Section ---
    profileHeader: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#007AFF', // Или использовать useThemeColor
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: "#007AFF",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    avatarText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    roleBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'rgba(0, 122, 255, 0.1)', // Легкий синий фон
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(0, 122, 255, 0.2)',
    },
    roleText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#007AFF',
        textTransform: 'uppercase',
    },

    // --- Cards & Sections ---
    sectionHeader: {
        fontSize: 14,
        fontWeight: '600',
        color: '#8E8E93',
        marginBottom: 8,
        marginLeft: 4,
        textTransform: 'uppercase',
    },
    card: {
        borderRadius: 16,
        marginBottom: 24,
        overflow: 'hidden',
        // Тени только для iOS/Android, на вебе можно проще
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 10,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    
    // --- Rows inside Cards ---
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        minHeight: 56,
    },
    rowIcon: {
        width: 32,
        alignItems: 'flex-start',
    },
    rowContent: {
        flex: 1,
        justifyContent: 'center',
    },
    rowLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    rowValue: {
        fontSize: 14,
        opacity: 0.6,
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(150, 150, 150, 0.1)',
        marginLeft: 48, // Отступ слева чтобы не резать иконку
    },

    // --- Logout & Footer ---
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 59, 48, 0.1)', // Легкий красный
        marginTop: 8,
        gap: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
    },
    versionText: {
        textAlign: 'center',
        marginTop: 24,
        fontSize: 12,
        opacity: 0.4,
    },
});