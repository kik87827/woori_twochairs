
/**
 * 디자인 모달
 * @param {*} option 
 */
 function DesignModal(option) {
    this.title = option.title;
    this.message = option.message;
    this.domHtml = document.querySelector("html");
    this.domBody = document.querySelector("body");
    this.pagewrap = document.querySelector(".page_wrap");
    this.design_modal_wrap = null;
    this.btn_dmsmidentify = null;
    this.btn_dmsmcancel = null;
    this.duration = option.duration !== undefined ? option.duration : 400;
    this.initShow(option);
  }
    
  DesignModal.prototype.initShow = function (option) {
    var innerPublish = '';
    var objThis = this;
    let confirmPublish = option.type === "confirm" ? `<a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmcancel'>취소</a>` : ``;
    /* 
    innerPublish += "<div class='design_modal_wrap'>";
    innerPublish += "  <div class='bg_design_modal'></div>";
    innerPublish += "  <div class='design_modal_w'>";
    innerPublish += "          <div class='design_modal'>";
  
    innerPublish += "              <div class='design_modal_cont_w'><div class='design_modal_text'></div></div>";
    innerPublish += "              <div class='btn_dmsm_wrap'>";
    if (option.type === "confirm") {
      innerPublish += "              <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmcancel'>취소</a>";
    }
    innerPublish += "                  <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmidentify'>확인</a>";
    innerPublish += "              </div>";
    innerPublish += "          </div>";
    innerPublish += "  </div>";
    innerPublish += "</div>";
   */
    innerPublish = `
    <div class='design_modal_wrap'>
      <div class='design_modal_tb'>
        <div class='design_modal_td'>
          <div class='bg_design_modal'></div>
          <div class='design_modal'>
            <div class='design_modal_cont_w'>
              <div class='design_modal_maintext'></div>
            </div>
            <div class='btn_dmsm_wrap'>
            <a href='javascript:;' class='btn_dmsm close_dmtrigger btn_dmsmclose'>확인</a>
            ${confirmPublish}
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  
    
    this.modalparent = document.createElement('div');
    this.pagewrap.appendChild(this.modalparent);
    this.modalparent.classList.add("design_modal_insert_wrap");
    this.modalparent.innerHTML = innerPublish;
    this.closetrigger = document.querySelectorAll(".close_dmtrigger");
    this.design_modal_wrap = document.querySelector(".design_modal_wrap");
    this.btn_modal_close = document.querySelector(".btn_modal_close");
  
    if (option.type === "confirm" || option.type === "alert") {
      this.design_modal_tit = document.querySelector(".design_modal_tit");
      this.design_modal_text = document.querySelector(".design_modal_maintext");
      this.design_modal_subtext = document.querySelector(".design_modal_subtext");
      this.btn_dmsmidentify = document.querySelector(".btn_dmsmidentify");
      this.design_modal_text.innerHTML = option.main_message;
      
    }
    if (option.type === "confirm") {
      this.btn_dmsmcancel = document.querySelector(".btn_dmsmcancel");
    }
    if (option.type === "title") {
      this.design_modal_tit.innerHTML = option.title;
    }
    
    this.bindEvent(option);
  }
  DesignModal.prototype.show = function () {
    this.pagewrap.style.zIndex = 0;
    this.domHtml.classList.add("touchDis");
    
    
    this.design_modal_wrap.classList.add("active");
    setTimeout(()=>{
      this.design_modal_wrap.classList.add("motion");
    }, 30);
  }
  DesignModal.prototype.hide = function () {
    var objThis = this;
    this.design_modal_wrap.classList.remove("motion");
    setTimeout(function () {
      objThis.design_modal_wrap.classList.remove("active");
      document.querySelector(".design_modal_insert_wrap").remove();
      objThis.design_modal_wrap.remove();
      objThis.domHtml.classList.remove("touchDis");
    }, 530);
  }
  DesignModal.prototype.bindEvent = function (option) {
    var objThis = this;
    let btn_close_item = this.closetrigger;
    btn_close_item.forEach((element,index)=>{
      element.addEventListener("click", function () {
        objThis.hide();
      }, false);
    })
    if (this.btn_dmsmidentify !== null) {
      this.btn_dmsmidentify.addEventListener("click", function () {
        if (option.identify_callback !== undefined) {
          option.identify_callback();
        }
      }, false);
    }
    if (this.btn_dmsmcancel !== null) {
      this.btn_dmsmcancel.addEventListener("click", function () {
        if (option.cancel_callback !== undefined) {
          option.cancel_callback();
        }
      }, false);
    }
  }