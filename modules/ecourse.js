// ====================================
// JASUKE HUB - E-COURSE MODULE
// ====================================

// Start Course
function startCourse(courseId) {
    const course = getCourseById(courseId);
    if (!course) return;

    const progress = Storage.getCourseProgress();
    const currentProgress = progress[courseId] || 0;

    if (currentProgress >= 100) {
        alert('You have already completed this course!');
        return;
    }

    // Simulate course progress
    const newProgress = Math.min(currentProgress + 20, 100);
    Storage.updateCourseProgress(courseId, newProgress);

    if (newProgress >= 100) {
        // Course completed - award points
        Storage.addPoints(course.points);
        alert(`🎉 Congratulations! You completed "${course.title}"!\n\n+${course.points} points earned!`);
    } else {
        alert(`Course in progress: ${newProgress}%\n\nKeep learning to earn ${course.points} points!`);
    }

    // Reload dashboard
    if (window.currentRoute === 'dashboard') {
        navigateTo('dashboard');
    }
}

// Render Courses
function renderCourses() {
    const progress = Storage.getCourseProgress();
    const points = Storage.getPoints();

    return `
    <div style="margin-bottom: var(--spacing-xl);">
      <div class="glass-card" style="background: var(--gradient-primary); border: none; text-align: center; padding: var(--spacing-xl);">
        <h3 style="font-size: var(--text-4xl); font-weight: 900; margin-bottom: var(--spacing-xs);">${points}</h3>
        <p style="font-size: var(--text-lg); opacity: 0.9;">Total Points Earned</p>
      </div>
    </div>
    
    <h3 style="font-size: var(--text-2xl); font-weight: 700; margin-bottom: var(--spacing-lg);">Available Courses</h3>
    
    <div class="grid grid-2" style="gap: var(--spacing-lg);">
      ${MOCK_COURSES.map(course => {
        const courseProgress = progress[course.id] || 0;
        const isCompleted = courseProgress >= 100;

        return `
          <div class="glass-card">
            <div style="margin-bottom: var(--spacing-md);">
              <div class="flex justify-between items-center" style="margin-bottom: var(--spacing-sm);">
                <h4 style="font-size: var(--text-lg); font-weight: 700;">${course.title}</h4>
                ${isCompleted ? '<span class="badge badge-success">Completed</span>' : ''}
              </div>
              <p style="color: var(--text-secondary); font-size: var(--text-sm); margin-bottom: var(--spacing-md);">
                ${course.description}
              </p>
              
              <div class="flex justify-between" style="font-size: var(--text-sm); color: var(--text-muted); margin-bottom: var(--spacing-md);">
                <span><i class="fas fa-clock"></i> ${course.duration}</span>
                <span><i class="fas fa-book"></i> ${course.lessons} lessons</span>
                <span><i class="fas fa-star"></i> ${course.points} points</span>
              </div>
              
              <div class="progress-bar" style="margin-bottom: var(--spacing-sm);">
                <div class="progress-fill" style="width: ${courseProgress}%"></div>
              </div>
              <p style="font-size: var(--text-xs); color: var(--text-muted); text-align: right;">
                ${courseProgress}% complete
              </p>
            </div>
            
            <button class="btn ${isCompleted ? 'btn-ghost' : 'btn-primary'}" 
                    onclick="startCourse(${course.id})" 
                    style="width: 100%;"
                    ${isCompleted ? 'disabled' : ''}>
              ${isCompleted ? '✓ Completed' : 'Continue Learning'}
            </button>
          </div>
        `;
    }).join('')}
    </div>
  `;
}
