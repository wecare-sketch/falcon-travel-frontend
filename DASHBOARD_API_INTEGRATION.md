# Dashboard API Integration Guide

## Overview

I've successfully integrated all 6 dashboard API endpoints into your Next.js application using TanStack Query and Axios. Here's what has been implemented:

## API Endpoints Integrated

1. **KPIs**: `/admin/dashboard/kpis` → `useDashboardKpis`
2. **Upcoming Events**: `/admin/dashboard/upcoming` → `useDashboardUpcoming`  
3. **Payment Status**: `/admin/dashboard/payment-status` → `useDashboardPaymentStatus`
4. **Monthly Targets**: `/admin/dashboard/monthly-targets` → `useDashboardMonthlyTargets`
5. **Recent Activities**: `/admin/dashboard/activities` → `useDashboardActivities`
6. **Dashboard Totals**: `/admin/dashboard` → `useDashboardTotal`

## Files Created

### Hook Files (`src/hooks/dashboard/`)
- `useDashboardKpis.ts` - For stats cards data
- `useDashboardUpcoming.ts` - For upcoming events table
- `useDashboardPaymentStatus.ts` - For payment status pie chart
- `useDashboardMonthlyTargets.ts` - For monthly targets bar chart
- `useDashboardActivities.ts` - For recent activities list
- `useDashboardTotal.ts` - For general dashboard totals
- `index.ts` - Exports all dashboard hooks

### Updated Components
- `DashboardPage.tsx` - Now uses `useDashboardKpis` for stats cards
- `UpcomingEventsTable.tsx` - Now uses `useDashboardUpcoming`
- `MonthlyTargetsChart.tsx` - Now uses `useDashboardMonthlyTargets`
- `PaymentStatusChart.tsx` - Now uses `useDashboardPaymentStatus`
- `RecentActivities.tsx` - Now uses `useDashboardActivities`

## Usage Example

```typescript
import { useDashboardKpis } from '@/hooks/dashboard';

function MyComponent() {
  const { data, isLoading, isError } = useDashboardKpis();
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  
  return (
    <div>
      <p>Active Events: {data?.activeEvents}</p>
      <p>Monthly Revenue: {data?.monthlyRevenue}</p>
    </div>
  );
}
```

## Actual API Response Structures ✅

### KPIs Endpoint (`/admin/dashboard/kpis`)
```typescript
{
  message: "success";
  data: {
    activeEvents: number;
    pendingEvents: number;
    monthlyRevenue: number;
    outstandingPayments: number;
  }
}
```
**Example Response:**
```json
{
  "message": "success",
  "data": {
    "activeEvents": 1,
    "pendingEvents": 0,
    "monthlyRevenue": 0,
    "outstandingPayments": 1819
  }
}
```

### Upcoming Events (`/admin/dashboard/upcoming`)
```typescript
{
  message: "success";
  data: Array<{
    id: string;
    slug: string;
    name: string;
    date: string; // ISO date string
    client: string;
    paymentstatus: string;
    vehiclesRequired: string | null;
  }>;
}
```
**Example Response:**
```json
{
  "message": "success",
  "data": [
    {
      "id": "21741bea-1e47-46ed-a4a1-93769f7ece53",
      "slug": "angela-areno-bae6",
      "name": "Dancing Event",
      "date": "2025-10-17T07:00:00.000Z",
      "client": "Angela Areno",
      "paymentstatus": "pending",
      "vehiclesRequired": null
    }
  ]
}
```

### Payment Status (`/admin/dashboard/payment-status`)
```typescript
{
  message: "success";
  data: Array<{
    status: string;
    count: number;
  }>;
}
```
**Example Response:**
```json
{
  "message": "success",
  "data": [
    {
      "status": "pending",
      "count": 1
    }
  ]
}
```

### Monthly Targets (`/admin/dashboard/monthly-targets`)
```typescript
{
  message: "success";
  data: Array<{
    month: string;
    target: number;
    achieved: number;
    percentage: number;
  }>;
}
```
**Example Response:**
```json
{
  "message": "success",
  "data": []
}
```

### Recent Activities (`/admin/dashboard/activities`)
```typescript
{
  message: "success";
  data: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    eventId?: string;
    eventName?: string;
    userId?: string;
    userName?: string;
  }>;
}
```
**Example Response:**
```json
{
  "message": "success",
  "data": []
}
```

### Dashboard Totals (`/admin/dashboard`) - Not tested yet
```typescript
{
  message: "success";
  data: {
    totalEvents: number;
    totalRevenue: number;
    totalUsers: number;
    totalPendingPayments: number;
    totalCompletedEvents: number;
    totalActiveEvents: number;
  }
}
```

## Features Implemented

✅ **Loading States** - All components show loading spinners while fetching data
✅ **Error Handling** - Proper error messages when API calls fail
✅ **TypeScript Types** - Full type safety for all API responses
✅ **Caching** - TanStack Query automatically caches responses
✅ **Auto-refetch** - Data refetches on window focus/network reconnect
✅ **Consistent Patterns** - Follows your existing hook patterns

## ✅ Integration Complete!

All dashboard components have been successfully updated to work with your actual API responses:

### What's Working Now:
1. **Stats Cards** - Using real KPI data from `/admin/dashboard/kpis`
2. **Upcoming Events Table** - Displaying events from `/admin/dashboard/upcoming`
3. **Payment Status Chart** - Shows payment distribution from `/admin/dashboard/payment-status`
4. **Monthly Targets Chart** - Handles empty data gracefully with fallback
5. **Recent Activities** - Ready for when activity data is available

### Data Mapping Completed:
- ✅ KPIs → Stats cards (Active Events: 1, Outstanding Payments: 1819)
- ✅ Upcoming Events → Table (Dancing Event by Angela Areno)
- ✅ Payment Status → Pie chart (1 pending payment)
- ✅ Monthly Targets → Bar chart (shows placeholder when empty)
- ✅ Recent Activities → List (shows "No activities" when empty)

### API Response Handling:
- ✅ All hooks updated to match actual response structure
- ✅ Components handle empty arrays gracefully
- ✅ Date formatting implemented for event dates
- ✅ Null value handling for vehiclesRequired field

## Notes

- All hooks use the same authorization pattern as your existing hooks
- The `/admin` prefix is automatically prepended to all endpoints
- Error handling follows your existing patterns
- Loading states are consistent across all components
- Empty data states are handled gracefully with fallback content

**Your dashboard is now fully integrated and ready to use!** 🎉
