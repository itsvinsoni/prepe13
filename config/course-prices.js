// Course Pricing Configuration
// 💰 Edit course prices here

const coursePrices = {
    // SSC Courses
    "ssc-cgl": { price: 999, originalPrice: 1499, discount: 33, popular: true, 
        features: ["Complete Video Lectures", "PDF Notes & Study Material", "Practice Tests & Mock Exams", "Previous Year Questions", "Doubt Clearing Sessions", "Mobile App Access"] },
    "ssc-chsl": { price: 799, originalPrice: 1199, discount: 25, popular: false, 
        features: ["Video Lectures", "Study Material", "Practice Tests", "Previous Papers"] },
    "ssc-mts": { price: 699, originalPrice: 999, discount: 30, popular: false, 
        features: ["Basic Video Lectures", "Study Notes", "Practice Questions"] },
    "ssc-gd": { price: 899, originalPrice: 1299, discount: 31, popular: false, 
        features: ["Complete Preparation", "Physical Test Guide", "Mock Tests"] },
    "ssc-stenographer": { price: 749, originalPrice: 1099, discount: 32, popular: false, 
        features: ["Typing Practice", "Shorthand Training", "Mock Tests"] },

    // Railway Courses  
    "railway-ntpc": { price: 899, originalPrice: 1399, discount: 36, popular: true, 
        features: ["Complete NTPC Preparation", "Railway Specific Content", "Mock Tests", "Current Affairs"] },
    "railway-group-d": { price: 699, originalPrice: 999, discount: 30, popular: false, 
        features: ["Group D Preparation", "Technical Knowledge", "Practice Sets"] },
    "railway-alp-technician": { price: 999, originalPrice: 1599, discount: 38, popular: false, 
        features: ["Technical Training", "Aptitude Tests", "Interview Preparation"] },

    // Banking Courses
    "banking-ibps-po": { price: 1299, originalPrice: 1999, discount: 35, popular: true, 
        features: ["Complete PO Preparation", "Banking Awareness", "Interview Training", "Group Discussion"] },
    "banking-ibps-clerk": { price: 999, originalPrice: 1499, discount: 33, popular: true, 
        features: ["Clerk Exam Preparation", "Computer Knowledge", "Mock Tests"] },
    "banking-sbi-po": { price: 1399, originalPrice: 2199, discount: 36, popular: false, 
        features: ["SBI Specific Content", "Advanced Preparation", "Personal Interview"] },
    "banking-sbi-clerk": { price: 1099, originalPrice: 1699, discount: 35, popular: false, 
        features: ["SBI Clerk Preparation", "State-wise Content", "Regional Focus"] },
    "banking-ibps-rrb": { price: 899, originalPrice: 1399, discount: 36, popular: false, 
        features: ["Rural Banking Focus", "Agricultural Knowledge", "Community Banking"] },
    "banking-lic-aao-ado": { price: 1199, originalPrice: 1799, discount: 33, popular: false, 
        features: ["Insurance Knowledge", "LIC Specific Content", "Professional Training"] },

    // Defence Courses
    "defence-nda": { price: 1199, originalPrice: 1899, discount: 37, popular: false, 
        features: ["Mathematics & GAT", "Physical Training Guide", "Personality Development", "SSB Interview Prep"] },
    "defence-cds": { price: 1099, originalPrice: 1699, discount: 35, popular: false, 
        features: ["Officer Training Content", "Leadership Skills", "Interview Preparation"] },
    "defence-capf": { price: 999, originalPrice: 1499, discount: 33, popular: false, 
        features: ["CAPF Specific Training", "Physical Standards", "Law & Order Knowledge"] },

    // Medical & Engineering
    "medical-neet-ug": { price: 1599, originalPrice: 2499, discount: 36, popular: true, 
        features: ["Complete NEET Preparation", "Physics, Chemistry, Biology", "NCERT Based Content", "All India Mock Tests", "Previous 20 Years Papers", "Doubt Resolution"] },
    "engineering-jee-main": { price: 1899, originalPrice: 2999, discount: 37, popular: true, 
        features: ["JEE Main & Advanced", "Mathematics, Physics, Chemistry", "IIT Level Questions", "Rank Prediction Tests", "Crash Course Available"] },

    // Teaching & Board
    "teaching-ctet": { price: 799, originalPrice: 1199, discount: 33, popular: false, 
        features: ["Child Psychology", "Teaching Methodology", "Subject Knowledge", "Practice Papers"] },
    "board-cbse-10th": { price: 599, originalPrice: 899, discount: 33, popular: false, 
        features: ["NCERT Based Content", "Board Exam Preparation", "Sample Papers", "Revision Notes"] }
};

window.coursePricing = {
    getCoursePrice: function(courseId) {
        return coursePrices[courseId] || { price: 999, originalPrice: 1499, discount: 33, popular: false, features: ["Basic Content"] };
    },
    getDiscountAmount: function(courseId) {
        const course = coursePrices[courseId];
        if (!course) return 0;
        return course.originalPrice - course.price;
    },
    getCategoryPrices: function(category) {
        const categoryPrices = {};
        Object.keys(coursePrices).forEach(courseId => {
            if (courseId.startsWith(category + '-')) {
                categoryPrices[courseId] = coursePrices[courseId];
            }
        });
        return categoryPrices;
    },
    applyCoupon: function(courseId, couponCode) {
        const validCoupons = { 'PREPE50': 50, 'FIRST20': 20, 'STUDENT10': 10, 'WELCOME100': 100 };
        const course = coursePrices[courseId];
        if (!course || !validCoupons[couponCode]) {
            return { valid: false, message: 'Invalid coupon code' };
        }
        let discountAmount = 0;
        const couponValue = validCoupons[couponCode];
        if (couponCode.endsWith('20') || couponCode.endsWith('10')) {
            discountAmount = Math.round(course.price * couponValue / 100);
        } else {
            discountAmount = couponValue;
        }
        const finalPrice = Math.max(course.price - discountAmount, 99);
        return {
            valid: true, originalPrice: course.price, discountAmount: discountAmount,
            finalPrice: finalPrice, couponCode: couponCode, message: `Coupon applied! You saved ₹${discountAmount}`
        };
    }
};

window.coursePrices = coursePrices;
console.log('💰 Course prices loaded');