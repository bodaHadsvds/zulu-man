import reportsMutations from "./mutations";
import reportsActions from "./actions";
import reportsGetters from "./getters";
export default {
  namespaced: true,
  state() {
    return {
      reports: {
        favorites: [],
        essentials: [
          {
            slogan: "active_members",
            title: "Active Members",
            description: "Clients holding an active membership/ punch card",
            icon: "users",
            route: { name: "Members", params: { report: "active_members" } },
          },
          {
            slogan: "sales",
            title: "Sales",
            description:
              "Total sum of all your business sales (products and memberships).",
            icon: "money-bills",
            route: { name: "sales" },
          },
          {
            slogan: "active_memberships",
            title: "Active Memberships",
            description: "All the active membership plans",
            icon: "address-card",
            route: {
              name: "Memberships",
              params: { report: "active_memberships" },
            },
          },
          {
            slogan: "session_punch_cards",
            title: "Session Punch Cards",
            description: "All active session packs",
            icon: "ticket-simple",
          },
          {
            slogan: "debts",
            title: "Debts",
            description: "Debt accumulated by all clients",
            icon: "money-check-dollar",
            route: {
              name: "sales",
              params: { report: "debets" },
            },
          },
          {
            slogan: "course_bookings",
            title: "Course Bookings",
            description:
              "All bookings made for courses. clients who booked at least one session in a course will appear in this report.",
            icon: "chart-gantt",
          },
          {
            slogan: "bookings_statistics",
            title: "Bookings Statistics",
            description:
              "Total bookings, check-ins and late cancellations per client/club",
            icon: "chart-line",
          },
          {
            slogan: "classes_summary",
            title: "Classes Summary",
            description:
              "All the booking/attendance rate, and the wage of the coaches for each group session",
            icon: "person-rays",
          },
          {
            slogan: "bookings",
            title: "Bookings",
            description:
              "All the group sessions and their booking information in a selected time period",
            icon: "clock-rotate-left",
          },
          {
            slogan: "visits",
            title: "Visits",
            description:
              "This report presents all the clients who enter the club in a time period",
            icon: "door-open",
          },
          {
            slogan: "memberships_forecast",
            title: "Memberships Forecast",
            description:
              "This report presents the active membership forecast for the upcoming year",
            icon: "chart-line",
          },
          {
            slogan: "transparent_memberships",
            title: "Transparent Memberships",
            description:
              "This report presents all the memberships which are not counted as part of the active memberships (free memberships, etc...)",
            icon: "id-card",
          },
          {
            slogan: "transparent_session_packs",
            title: "Transparent Session Packs",
            description:
              "This report presents all the session packs which are not counted as part of the active session packs (free session packs, etc...)",
            icon: "ticket-simple",
          },
          {
            slogan: "payment_transactions",
            title: "Payment Transactions",
            description: "All the transactions of the club and their status",
            icon: "money-bill-transfer",
          },
          {
            slogan: "employee_attendance",
            title: "Employee Attendance",
            description:
              "This report presents all the shifts of the staff members and allows you to edit/add new shifts",
            icon: "business-time",
          },
          {
            slogan: "members_on_hold",
            title: "Members on Hold",
            description: "All the memberships on hold",
            icon: "pause",
          },
          {
            slogan: "birthday",
            title: "Birthday",
            description: "All the client's birthdays in a selected time period",
            icon: "cake-candles",
          },
          {
            slogan: "staff_members_log",
            title: "Staff Members Log",
            description: "Documentation of staff members actions in the system",
            icon: "rectangle-list",
          },
          {
            slogan: "members_properties",
            title: "Members' Properties",
            description:
              "List of all the clients and their statuses about signed waivers, medical certificate, messages subscriptions, etc",
            icon: "address-book",
          },
          {
            slogan: "restricted_members",
            title: "Restricted Members",
            description:
              "This report presents all the restricted clients of the business",
            icon: "arrow-right-from-bracket",
          },
          {
            slogan: "membership_renewal",
            title: "Membership Renewal",
            description: "All the membership renewals",
            icon: "arrow-rotate-right",
          },
          {
            slogan: "future_membership_plans",
            title: "Future Membership Plans",
            description: "All future memberships and their start date",
            icon: "clock",
          },
          {
            slogan: "future_session_packs",
            title: "Future Session Packs",
            description: "All the session packs with a future starting time",
            icon: "clock",
          },
          {
            slogan: "signed_forms",
            title: "Signed Forms",
            description: "All signed forms",
            icon: "signature",
          },
        ],
        growth: [
          {
            slogan: "leads_in_progress",
            title: "Leads In Progress",
            description:
              "Status of all active leads who have yet to be converted to clients",
            icon: "bars-progress",
            route: { name: "Leads", params: { report: "progress" } },
          },
          {
            slogan: "trial_classes",
            title: "Trial Classes",
            description: "All the leads which are booked for trial classes",
            icon: "person-rays",
          },
          {
            slogan: "all_leads",
            title: "All Leads",
            description: "All the leads of the clubs and their status",
            icon: "circle-user",
            route: { name: "Leads" },
          },
          {
            slogan: "converted_leads",
            title: "Converted Leads",
            description: "All the leads which become members of the club",
            icon: "medal",
          },
          {
            slogan: "lost_leads",
            title: "Lost Leads",
            description:
              "All the leads who decided to not join the club and their reason for lost",
            icon: "user-xmark",
            route: { name: "Leads", params: { report: "lost" } },
          },
          {
            slogan: "leads_statistics",
            title: "Leads Statistics",
            description:
              "Statistics about the leads, such as new leads, converted leads, trial classes, etc...",
            icon: "chart-line",
          },
        ],
        retention: [
          {
            slogan: "expiring_membership_plans",
            title: "Expiring Membership Plans",
            description:
              "All the membership plans which are about to expire in the next 2 weeks",
            icon: "triangle-exclamation",
          },
          {
            slogan: "expiring_session_packs",
            title: "Expiring Session Packs",
            description:
              "All the session packs that are about to expire or have only a few sessions left",
            icon: "triangle-exclamation",
          },
          {
            slogan: "Absence",
            title: "Absence",
            description:
              "This report presents all the members who haven't entered the club/booked class lately (Excluding holds customers)",
            icon: "ghost",
          },
          {
            slogan: "booking_cancellations",
            title: "Booking Cancellations",
            description: "This report presents all the booking cancellations",
            icon: "calendar-xmark",
          },
          {
            slogan: "late_cancellations",
            title: "Late Cancellations",
            description:
              "This report presents all the late cancellations of the club",
            icon: "calendar-xmark",
          },
          {
            slogan: "inactive_members",
            title: "Inactive Members",
            description: "All the inactive members of the club",
            icon: "user-xmark",
          },
          {
            slogan: "group_sessions_entrance_preservation",
            title: "Group Sessions/Entrance Preservation",
            description:
              "This report presents the group sessions/entrance of the club members for the past 10 weeks",
            icon: "arrow-up-9-1",
          },
          {
            slogan: "expired_membership_plans",
            title: "Expired Membership Plans",
            description: "All memberships that have been canceled or expired",
            icon: "hourglass-end",
          },
          {
            slogan: "expired_session_punch_cards",
            title: "Expired Session Punch Cards",
            description: "All the expired session punch cards",
            icon: "hourglass-end",
          },
          {
            slogan: "cancellations",
            title: "Cancellations",
            description:
              "All the memberships canceled and their cancellation reason",
            icon: "x",
          },
        ],
      },
    };
  },
  getters: reportsGetters,
  mutations: reportsMutations,
  actions: reportsActions,
};
