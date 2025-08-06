import { StyleSheet } from 'react-native';

export const trialOrdersStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  headerTime: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#333',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  trialCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  newTrialText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF6B35',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  trialTimeSection: {
    marginBottom: 12,
  },
  trialStartTime: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  distanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  distanceItem: {
    alignItems: 'center',
  },
  distanceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  distanceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  companyName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  address: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 12,
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  timeAway: {
    fontSize: 12,
    color: '#666',
  },
  goToStoreButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  goToStoreGradient: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goToStoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    textTransform: 'uppercase',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});