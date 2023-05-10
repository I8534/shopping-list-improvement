// 수정본은 이벤트 위임을 통해서 수정할 것이다.
// 즉 부모에 이벤트를 위임함으로서 훨씬 코드를 간결하게 작성할 것이다.
// 방법은 각 태그마다 고유한 아이디를 부여해서 휴지통 클릭스 해당칸만 삭제를 하게 하려는 것이다.

const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

function onAdd() {
  // 사용자가 입력한 텍스트 받아오기
  const text = input.value;
  if (text === '') {
    input.focus();  // -> 이걸 안 하면 포커스가 버튼으로 간다.
    return;
  }
  // 그리고 새로운 아이템을 만듬 (텍스트 + 삭제 버튼)
  const item = createitem(text);
  // 아이템 컨테이너 안에 새로 만든 아이템을 추가한다
  items.appendChild(item);
  // 새로 추가된 아이템으로 스크롤링
  item.scrollIntoView({ block: 'center' });
  // 인풋을 초기화한다.
  input.value = ''
  input.focus();  //-> 이걸 안 주면 다시 사용자가 거길 클릭해서 입력해야 한다.
}

let id = 0;

function createitem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.setAttribute('data-id', id);
  itemRow.innerHTML = `
    <div class="item">
      <span class="item__name">${text}</span>
      <button class="item__delete">
        <i class="fa-sharp fa-solid fa-trash" data-id=${id}></i>
      </button>
    </div>
    <div class="item__divider"></div>
  `;

  id++;

  return itemRow;
}

addBtn.addEventListener('click', () => {
  onAdd();
});

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    onAdd();
  }
});

items.addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  if (id) {
    const tobedeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    tobedeleted.remove();
  }
});