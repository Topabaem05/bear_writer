document.addEventListener('DOMContentLoaded', function() {
    // Slide data
    const slidesData = [
        {
            id: 1,
            title: "시작 화면",
            imageUrl: "https://pplx-res.cloudinary.com/image/upload/v1749179107/gpt4o_images/h5iouu6hxbjqsxgzviix.png",
            purpose: "첫 실행 경험과 브랜드 소개 제공",
            elements: [
                "앱 로고 (펜 아이콘)",
                "앱 이름 'WriteFlow'",
                "로딩 애니메이션 (미묘한 페이드인)",
                "버전 정보 (하단)"
            ],
            interactions: [
                "2-3초 후 라이브러리로 자동 전환",
                "이 시간 동안 사용자 환경설정 로드",
                "이전 세션 상태 복원"
            ],
            notes: "깔끔하고 미니멀한 디자인은 앱의 시각적 정체성을 확립하고 기대감을 조성합니다"
        },
        {
            id: 2,
            title: "문서 라이브러리",
            imageUrl: "https://pplx-res.cloudinary.com/image/upload/v1749179160/gpt4o_images/qoi3fhxprdrliccxehe8.png",
            purpose: "문서를 정리하고 접근하는 중앙 허브",
            elements: [
                "제목과 작업 버튼이 있는 내비게이션 바",
                "필터 옵션이 있는 검색 바",
                "확장 가능한 섹션이 있는 폴더 구조",
                "메타데이터와 미리보기가 있는 문서 목록"
            ],
            interactions: [
                "문서를 탭하여 편집기에서 열기",
                "컨텍스트 메뉴용 길게 누르기 (이름 변경, 삭제, 즐겨찾기)",
                "빠른 작업을 위한 스와이프 액션",
                "아래로 당겨 새로 고침"
            ],
            notes: "계층적 구성은 깔끔한 시각적 디자인을 유지하면서 직관적인 탐색을 제공합니다"
        },
        {
            id: 3,
            title: "글쓰기 편집기 (라이트 모드)",
            imageUrl: "https://pplx-res.cloudinary.com/image/upload/v1749179230/gpt4o_images/qm7gnbzkdfsik3etjo0x.png",
            purpose: "마크다운 지원이 있는 기본 글쓰기 인터페이스",
            elements: [
                "문서 컨트롤이 있는 내비게이션 바",
                "마크다운 강조 표시가 있는 텍스트 편집기 영역",
                "문서 메트릭이 있는 상태 표시줄",
                "일반적인 작업이 있는 서식 지정 도구 모음"
            ],
            interactions: [
                "탭하여 커서 위치 지정",
                "서식 옵션을 위한 텍스트 선택",
                "정기적인 간격으로 자동 저장",
                "일반적인 서식 지정 요구에 도구 모음 액세스"
            ],
            notes: "필요한 도구를 손이 닿는 곳에 제공하면서 콘텐츠를 우선시하는 깔끔한 인터페이스"
        },
        {
            id: 4,
            title: "집중 모드",
            imageUrl: "https://pplx-res.cloudinary.com/image/upload/v1749179289/gpt4o_images/qctlumg5ufpxbzmpf5fc.png",
            purpose: "현재 내용을 강조하는 방해가 없는 글쓰기 환경",
            elements: [
                "단순화된 헤더 (제목만)",
                "현재 문장/단락 강조 표시 (100% 불투명도)",
                "다른 텍스트 흐려짐 (30% 불투명도)",
                "최소한의 UI 요소"
            ],
            interactions: [
                "탭하여 집중 모드 종료",
                "커서 이동이 자동으로 초점 조정",
                "더블 탭하여 문장과 단락 초점 전환",
                "쓰기가 자동으로 스크롤되어 커서 가시성 유지"
            ],
            notes: "집중 모드는 시각적 소음을 줄이고 관련 있는 것만 강조함으로써 집중력을 향상시킵니다"
        },
        {
            id: 5,
            title: "다크 모드 편집기",
            imageUrl: "https://pplx-res.cloudinary.com/image/upload/v1749179477/gpt4o_images/iajz6ymbl6d5hcrfwu6t.png",
            purpose: "저조도 조건에서 눈에 친화적인 글쓰기 환경",
            elements: [
                "밝은 텍스트가 있는 어두운 배경",
                "가시성을 위한 파란색 커서",
                "대비가 최적화된 UI 요소",
                "필수적이지 않은 구성 요소 흐리게 처리"
            ],
            interactions: [
                "라이트 모드 편집기와 동일한 상호 작용",
                "시스템 테마에 기반한 자동 전환",
                "설정 또는 빠른 작업을 통한 수동 전환"
            ],
            notes: "다크 테마는 가독성과 기능성을 유지하면서 저조도 환경에서 눈의 피로를 줄입니다"
        },
        {
            id: 6,
            title: "설정 화면",
            imageUrl: "https://pplx-res.cloudinary.com/image/upload/v1749179350/gpt4o_images/y5fnvnsvlhrmvgzzjmof.png",
            purpose: "사용자 맞춤화 및 환경설정 관리",
            elements: [
                "그룹화된 설정 섹션",
                "이진 옵션을 위한 토글 스위치",
                "범위 값을 위한 슬라이더",
                "다중 선택 옵션을 위한 선택 메뉴"
            ],
            interactions: [
                "빠른 변경을 위한 토글 스위치",
                "자세한 옵션을 위한 선택 메뉴",
                "시각적 변경 사항의 즉각적인 적용",
                "논리적 그룹화가 있는 스크롤 가능한 인터페이스"
            ],
            notes: "정리된 설정은 앱의 미니멀한 미학을 유지하면서 사용자 지정을 직관적으로 만듭니다"
        },
        {
            id: 7,
            title: "미리보기 모드",
            imageUrl: "https://pplx-res.cloudinary.com/image/upload/v1749179416/gpt4o_images/b1uslkkhjf6nwuopappz.png",
            purpose: "마크다운 서식의 렌더링된 보기",
            elements: [
                "편집 및 공유 옵션이 있는 내비게이션 바",
                "렌더링된 마크다운 콘텐츠",
                "서식이 지정된 제목, 목록 및 강조",
                "읽기 진행 표시기"
            ],
            interactions: [
                "스크롤하여 문서 탐색",
                "링크를 탭하여 열기",
                "여러 형식으로 문서 공유",
                "한 번의 탭으로 편집 모드로 돌아가기"
            ],
            notes: "미리보기 모드는 문서가 내보내거나 공유할 때 어떻게 보일지 정확히 보여줍니다"
        },
        {
            id: 8,
            title: "검색 인터페이스",
            imageUrl: "https://pplx-res.cloudinary.com/image/upload/v1749179537/gpt4o_images/tlxfnxs4mlxczdgun1eb.png",
            purpose: "콘텐츠 검색 및 문서 필터링",
            elements: [
                "쿼리 입력이 있는 검색 바",
                "결과 정제를 위한 필터 옵션",
                "일치 컨텍스트가 있는 결과 목록",
                "강조 표시된 검색어"
            ],
            interactions: [
                "입력 중 실시간 검색 결과",
                "여러 필터 동시 적용",
                "결과를 탭하여 문서 열기",
                "최근 검색 보기"
            ],
            notes: "강력한 검색 기능은 사용자가 문서 라이브러리 전체에서 콘텐츠를 빠르게 찾을 수 있도록 도와줍니다"
        },
        {
            id: 9,
            title: "통계 화면",
            imageUrl: "https://pplx-res.cloudinary.com/image/upload/v1749179669/gpt4o_images/y52kjckyeaqqsqud6qjt.png",
            purpose: "글쓰기 메트릭 및 생산성 인사이트",
            elements: [
                "단어 수 그래프 및 추세",
                "글쓰기 세션 기간 메트릭",
                "목표 진행 표시기",
                "글쓰기 연속 달력"
            ],
            interactions: [
                "다른 기간 간 전환",
                "상세 정보를 위해 그래프 포인트 탭",
                "글쓰기 목표 설정 및 조정",
                "통계 보고서 내보내기"
            ],
            notes: "통계는 사용자가 글쓰기 습관을 추적하고 개선하는 데 도움이 되는 동기부여와 인사이트를 제공합니다"
        }
    ];

    // DOM elements
    const slidesContainer = document.getElementById('slides');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const currentSlideEl = document.getElementById('current-slide');
    const totalSlidesEl = document.getElementById('total-slides');
    const slideShowContainer = document.querySelector('.slideshow-container');
    
    let currentSlide = 0;
    
    // Initialize slideshow
    function initSlideshow() {
        // Set total slides
        totalSlidesEl.textContent = slidesData.length;
        
        // Create slides
        slidesData.forEach((slide, index) => {
            const slideEl = createSlideElement(slide);
            slidesContainer.appendChild(slideEl);
        });
        
        // Set initial position
        updateSlidePosition();
    }
    
    // Create single slide element
    function createSlideElement(slide) {
        const slideEl = document.createElement('div');
        slideEl.className = 'slide';
        
        const slideHeader = document.createElement('div');
        slideHeader.className = 'slide-header';
        slideHeader.innerHTML = `<h2>${slide.title}</h2>`;
        
        const slideContent = document.createElement('div');
        slideContent.className = 'slide-content';
        
        // Image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'slide-image-container';
        
        const image = document.createElement('img');
        image.className = 'slide-image';
        image.src = slide.imageUrl;
        image.alt = slide.title;
        image.style.cursor = 'zoom-in';
        image.title = '클릭하여 확대';
        
        // Add click handler for zoom
        image.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleImageZoom(image);
        });
        
        imageContainer.appendChild(image);
        
        // Details container
        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'slide-details';
        
        // Purpose
        const purposeSection = document.createElement('div');
        purposeSection.className = 'slide-section';
        purposeSection.innerHTML = `
            <h3 class="slide-section-title">목적</h3>
            <p>${slide.purpose}</p>
        `;
        
        // Elements
        const elementsSection = document.createElement('div');
        elementsSection.className = 'slide-section';
        elementsSection.innerHTML = `
            <h3 class="slide-section-title">주요 UI 요소</h3>
            <ul class="slide-list">
                ${slide.elements.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
        
        // Interactions
        const interactionsSection = document.createElement('div');
        interactionsSection.className = 'slide-section';
        interactionsSection.innerHTML = `
            <h3 class="slide-section-title">상호작용</h3>
            <ul class="slide-list">
                ${slide.interactions.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
        
        // Notes
        const notesSection = document.createElement('div');
        notesSection.className = 'slide-section';
        notesSection.innerHTML = `
            <h3 class="slide-section-title">디자인 노트</h3>
            <p>${slide.notes}</p>
        `;
        
        detailsContainer.appendChild(purposeSection);
        detailsContainer.appendChild(elementsSection);
        detailsContainer.appendChild(interactionsSection);
        detailsContainer.appendChild(notesSection);
        
        slideContent.appendChild(imageContainer);
        slideContent.appendChild(detailsContainer);
        
        slideEl.appendChild(slideHeader);
        slideEl.appendChild(slideContent);
        
        return slideEl;
    }
    
    // Update slide position
    function updateSlidePosition() {
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        currentSlideEl.textContent = currentSlide + 1;
    }
    
    // Navigate to previous slide
    function goToPrevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlidePosition();
        }
    }
    
    // Navigate to next slide
    function goToNextSlide() {
        if (currentSlide < slidesData.length - 1) {
            currentSlide++;
            updateSlidePosition();
        }
    }
    
    // Toggle fullscreen mode
    function toggleFullscreen() {
        slideShowContainer.classList.toggle('fullscreen');
        
        if (slideShowContainer.classList.contains('fullscreen')) {
            fullscreenBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 14h6m0 0v6m0-6l-7 7m17-11h-6m0 0V4m0 6l7-7"/>
                </svg>
                <span>전체화면 종료</span>
            `;
        } else {
            fullscreenBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
                    <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
                    <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
                    <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
                </svg>
                <span>전체화면</span>
            `;
        }
    }
    
    // Toggle image zoom
    function toggleImageZoom(imageElement) {
        const isZoomed = imageElement.classList.contains('zoomed');
        
        if (!isZoomed) {
            // Enter zoom mode
            imageElement.classList.add('zoomed');
            imageElement.style.cursor = 'zoom-out';
            imageElement.title = '클릭하여 축소';
            document.body.style.overflow = 'hidden';
            
            // Create overlay to capture clicks outside image
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            overlay.style.zIndex = '999';
            overlay.style.cursor = 'zoom-out';
            document.body.appendChild(overlay);
            
            // Close on overlay click
            overlay.addEventListener('click', function() {
                exitZoom();
            });
            
            // Close on image click
            const closeHandler = function(e) {
                e.stopPropagation();
                exitZoom();
            };
            imageElement.addEventListener('click', closeHandler, { once: true });
            
            function exitZoom() {
                imageElement.classList.remove('zoomed');
                imageElement.style.cursor = 'zoom-in';
                imageElement.title = '클릭하여 확대';
                document.body.style.overflow = '';
                document.body.removeChild(overlay);
            }
        }
    }
    
    // Event listeners
    prevBtn.addEventListener('click', goToPrevSlide);
    nextBtn.addEventListener('click', goToNextSlide);
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToPrevSlide();
        } else if (e.key === 'ArrowRight') {
            goToNextSlide();
        } else if (e.key === 'Escape') {
            // Exit fullscreen
            if (slideShowContainer.classList.contains('fullscreen')) {
                toggleFullscreen();
            }
            
            // Exit zoomed image
            const zoomedImage = document.querySelector('.slide-image.zoomed');
            if (zoomedImage) {
                const overlay = document.querySelector('div[style*="position: fixed"]');
                if (overlay) {
                    overlay.click();
                }
            }
        }
    });
    
    // Initialize
    initSlideshow();
});