/* 메인화면 */
$(function(){
   /* 로그인 처리 */
   $("#loginBtn").click(function(){
       /* 아이디 비밀번호 입력 체크*/
      const userEmail    = $("#userEmail").val();
      const userPassword = $("#password").val();

      if ( !userEmail && !userPassword ) {
          alert("아이디와 비밀번호를 입력해주세요");
          return false;
      }else {
          const formData = $("#loginForm").serialize();

          $.ajax({
              type: 'POST',
              url: '/auth/login',
              data: formData,
              success: function(response) {
                  console.log("Server Response:", response);
                  if ( response.success ){
                      window.location.href="/user/myPage";
                  }
              },
              error: function(xhr, status, error) {
                  console.error("Login Error:", error);
                  // Handle error (e.g., show an error message)
              }
          });
      }
   });
    /* 카카오 로그인 */
    $("#kakaoLoginBtn").click(function(){
        location.href="/auth/kakao";
    });
});