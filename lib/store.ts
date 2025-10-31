import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
	ServiceRequest,
	AuditEntry,
} from '@/app/components/equipment/EquipmentTypes';
import { mockServiceRequests } from '@/app/components/equipment/MockData';
import { AutomationRule } from '@/app/components/equipment/AutomationSetup';

interface UserState {
	userRole: 'branch_mgr' | 'facility' | null;
	currentUser: string;
	userBranch: string;
	userBranchCode: string;
	setUser: (
		role: 'branch_mgr' | 'facility',
		email: string,
		branchName?: string,
		branchCode?: string
	) => void;
	clearUser: () => void;
}

interface RequestState {
	allRequests: ServiceRequest[];
	automationRules: AutomationRule[];
	addRequest: (request: ServiceRequest) => void;
	updateRequest: (id: string, updates: Partial<ServiceRequest>) => void;
	setRequests: (requests: ServiceRequest[]) => void;
	setAutomationRules: (rules: AutomationRule[]) => void;
}

export const useStore = create<UserState & RequestState>()(
	persist(
		(set) => ({
			// User state
			userRole: null,
			currentUser: '',
			userBranch: '',
			userBranchCode: '',

			setUser: (role, email, branchName, branchCode) =>
				set({
					userRole: role,
					currentUser: email,
					userBranch: branchName || '',
					userBranchCode: branchCode || '',
				}),

			clearUser: () =>
				set({
					userRole: null,
					currentUser: '',
					userBranch: '',
					userBranchCode: '',
				}),

			// Request state
			allRequests: mockServiceRequests,
			automationRules: [],
			addRequest: (request) =>
				set((state) => ({
					allRequests: [...state.allRequests, request],
				})),
			updateRequest: (id, updates) =>
				set((state) => ({
					allRequests: state.allRequests.map((req) =>
						req.id === id ? { ...req, ...updates } : req
					),
				})),
			setRequests: (requests) => set({ allRequests: requests }),
			setAutomationRules: (rules) => set({ automationRules: rules }),
		}),
		{
			name: 'equipment-servicing-storage',
		}
	)
);
