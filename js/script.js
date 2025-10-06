// 다크 모드 감지 및 설정
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});

// 모든 텍스트 영역의 높이를 자동으로 조정
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        const parentHeight = this.closest('.canvas-section').clientHeight;
        const headerHeight = this.previousElementSibling.offsetHeight + 
                            this.previousElementSibling.previousElementSibling.offsetHeight;
        const padding = 32; // 섹션의 패딩 값 (p-4 = 16px * 2)
        const maxHeight = Math.min(120, parentHeight - headerHeight - padding);
        const newHeight = Math.min(this.scrollHeight, maxHeight);
        this.style.height = newHeight + 'px';
    });
});

// 복사 버튼 기능
document.getElementById('copyBtn').addEventListener('click', () => {
    const sections = [
        { name: '문제', id: 'problem' },
        { name: '솔루션', id: 'solution' },
        { name: '고유한 가치 제안', id: 'uniqueValueProposition' },
        { name: '부당한 이점', id: 'unfairAdvantage' },
        { name: '고객 세그먼트', id: 'customerSegments' },
        { name: '핵심 지표', id: 'keyMetrics' },
        { name: '채널', id: 'channels' },
        { name: '비용 구조', id: 'costStructure' },
        { name: '수익원', id: 'revenueStreams' }
    ];

    let text = '# 린 캔버스\n\n';
    sections.forEach(section => {
        const content = document.getElementById(section.id).value;
        text += `## ${section.name}\n${content || '(비어 있음)'}\n\n`;
    });

    navigator.clipboard.writeText(text).then(() => {
        const alert = document.getElementById('copyAlert');
        alert.classList.remove('hidden');
        setTimeout(() => {
            alert.classList.add('hidden');
        }, 2000);
    });
});

// 초기화 버튼 기능
document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm('모든 내용을 지우시겠습니까?')) {
        document.querySelectorAll('textarea').forEach(textarea => {
            textarea.value = '';
            textarea.style.height = 'auto';
        });
    }
});