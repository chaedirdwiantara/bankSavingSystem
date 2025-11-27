# Testing Plan - Bank Saving System

## 📱 Testing Environment
- **Metro Bundler**: Running on http://localhost:8081
- **React Native Version**: 0.82
- **Current Phase**: Customer Feature Testing

---

## ✅ Phase 1: Manual Testing Checklist

### 1. App Initialization
- [ ] App launches without crashes
- [ ] Redux store initializes correctly
- [ ] Dummy data loads (3 customers, 3 deposito types)
- [ ] Bottom tab navigation displays (👥 Customers, 💼 Accounts, 💰 Deposito)

### 2. Customer List Screen
- [ ] Navigate to Customers tab
- [ ] Customer list displays all 3 dummy customers
- [ ] Each customer card shows:
  - Customer name
  - Created date (formatted)
  - Arrow icon (›)
- [ ] "Add" button visible in header
- [ ] Empty state shows if no customers (after deletion)

### 3. Customer Form Screen (Create)
- [ ] Tap "+ Add" button
- [ ] Form screen displays with title "👤 Add Customer"
- [ ] Input field shows:
  - Label "Customer Name"
  - Placeholder text
  - Required indicator
- [ ] Validation works:
  - Empty name shows error
  - Name < 3 chars shows error
  - Valid name (≥3 chars) passes
- [ ] "Create Customer" button functional
- [ ] "Cancel" button navigates back
- [ ] Loading state shows during creation
- [ ] Success: navigates back to list
- [ ] New customer appears in list

### 4. Customer Detail Screen
- [ ] Tap on a customer card
- [ ] Detail screen shows:
  - Customer icon (👤)
  - Customer name (large, centered)
  - Created date
  - Last updated date
  - Accounts section (empty for now)
- [ ] "← Back" button navigates back
- [ ] "Edit" button visible
- [ ] "Delete" button visible (red)

### 5. Customer Form Screen (Edit)
- [ ] Tap "Edit" on detail screen
- [ ] Form screen displays with title "✏️ Edit Customer"
- [ ] Input pre-filled with existing name
- [ ] Can modify name
- [ ] Validation works same as create
- [ ] "Update Customer" button functional
- [ ] Success: navigates back to detail
- [ ] Updated name reflects in list

### 6. Customer Deletion
- [ ] Tap "Delete" on detail screen
- [ ] Modal appears with confirmation
- [ ] "Cancel" closes modal
- [ ] "Delete" removes customer
- [ ] Success: navigates back to list

---

## 🚀 How to Run Tests

### Android
```bash
npx react-native run-android
```

### iOS (macOS only)
```bash
npx react-native run-ios
```

---

## 📝 Test Results

**Overall Status**: [ ] PASS [ ] FAIL

**Issues Found**:
1. _____________________________
2. _____________________________

---

## 🎯 Next Steps

1. **If PASS**: Implement remaining screens (Accounts, Deposito, Transactions)
2. **If FAIL**: Document and fix bugs
