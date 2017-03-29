$(document).ready(function(){

  setTimeout(()=>{
    $('#hello-row').slideDown(1000);
  },1500);

  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();

  // $('#new-house-button').click((e)=>{
  //
  //   $.ajax({
  //     url: `/house`,
  //     method: 'POST',
  //     data: {},
  //     success: (result)=>{
  //       console.log(result);
  //
  //     },
  //     error: (err)=>{ console.log(err);}
  //   });
  // });
});
