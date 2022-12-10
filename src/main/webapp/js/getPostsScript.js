$(function() {
	GetLikedPosts();
	GetRecentPosts();
	GetAllPosts();
});

// get all the liked posts
function GetLikedPosts(){
	var post_id_list = $('#post-id-list').val();
	var post_id_arr = post_id_list.slice(1, -1);
	post_id_arr = post_id_arr.split(', ');
	
	var post_img_list = $('#post-img-list').val();
	var post_img_arr = post_img_list.slice(1, -1);
	post_img_arr = post_img_arr.split(', ');
	
	var post_author_list = $('#post-author-list').val();
	var post_author_arr = post_author_list.slice(1, -1);
	post_author_arr = post_author_arr.split(', ');
	
	var post_title_list = $('#post-title-list').val();
	var post_title_arr = post_title_list.slice(1, -1);
	post_title_arr = post_title_arr.split(', ');
	
	var post_like_list = $('#post-like-list').val();
	var post_like_arr = post_like_list.slice(1, -1);
	post_like_arr = post_like_arr.split(', ');
	
	var liked_post_list = $('#liked-post-list').val();
	var liked_post_arr = liked_post_list;
	if (liked_post_list !== 'null'){
		liked_post_arr = liked_post_list.slice(1, -1);
		liked_post_arr = liked_post_arr.split(', ');
	}
	
	var liked_post_num = 0;
	
	for(var i = 0; i < post_id_arr.length; i++){
		
		var target_post_id = post_id_arr[i];
		
		// check liked or not
		var is_liked = false;
		if (liked_post_arr != 'null' && liked_post_arr !== ''){
			liked_post_arr.forEach(function(liked_post){
				if (liked_post == target_post_id){
					liked_post_num += 1;
					is_liked = true;
				}
			});
		}
		
		// don't get if not liked
		if (!is_liked) continue;
		
		// add item to grid
		$('#post-liked-grid').append(
			$('<div>').prop({
				className: 'post-item',
				id: 'post-liked-item-' + target_post_id
			})
		);
		
		// add thumbnail, title, footer to item
		$('#post-liked-item-' + target_post_id).append(
			$('<button>').prop({
				className: 'post-thumbnail',
				id: 'post-liked-thumbnail-' + target_post_id,
				type: 'button'
			}),
			$('<div>').prop({
				className: 'post-title',
				id: 'post-liked-title-' + target_post_id
			}),
			$('<div>').prop({
				className: 'post-author',
				id: 'post-liked-author-' + target_post_id
			}),
			$('<div>').prop({
				className: 'post-footer',
				id: 'post-liked-footer-' + target_post_id
			})
		);
		
		// change thumbnail
		$('#post-liked-thumbnail-' + target_post_id).attr('onClick', 'ClickPostItem(this);');
		$('#post-liked-thumbnail-' + target_post_id).css({"background":"url(data:image/;base64," + post_img_arr[i] + ")"});
		$('#post-liked-thumbnail-' + target_post_id).css('background-size', '150%');
		$('#post-liked-thumbnail-' + target_post_id).css('background-position', 'center');
		
		// change title
		$('#post-liked-title-' + target_post_id).text(post_title_arr[i]);
		
		// change author
		$('#post-liked-author-' + target_post_id).text('author: ' + post_author_arr[i]);
		
		// change footer
		$('#post-liked-footer-' + target_post_id).append(
			$('<button>').prop({
				className: 'post-footer-heart',
				id: 'post-liked-footer-heart-' + target_post_id,
				type: 'button',
			})
		);
		
		$('#post-liked-footer-heart-' + target_post_id).attr('onClick', 'ClickPostLike(this);');
		
		if (is_liked == true){
			$('#post-liked-footer-heart-' + target_post_id).append('<i class="fa-solid fa-heart"></i>');
		}
		else{
			$('#post-liked-footer-heart-' + target_post_id).append('<i class="fa-regular fa-heart"></i>');
		}
		$('#post-liked-footer-' + target_post_id).append(' ' + post_like_arr[i]);
	}
	
	// no liked post
	if(liked_post_num === 0){
		$('#post-liked-grid').hide();
		$('#post-liked-no').show();
	}
	else{
		$('#post-liked-no').hide();
		$('#post-liked-grid').show();
	}
}

// get top 3
function GetRecentPosts(){
	var post_id_list = $('#post-id-list').val();
	var post_id_arr = post_id_list.slice(1, -1);
	post_id_arr = post_id_arr.split(', ');
	
	var post_img_list = $('#post-img-list').val();
	var post_img_arr = post_img_list.slice(1, -1);
	post_img_arr = post_img_arr.split(', ');
	
	var post_author_list = $('#post-author-list').val();
	var post_author_arr = post_author_list.slice(1, -1);
	post_author_arr = post_author_arr.split(', ');
	
	var post_title_list = $('#post-title-list').val();
	var post_title_arr = post_title_list.slice(1, -1);
	post_title_arr = post_title_arr.split(', ');
	
	var post_like_list = $('#post-like-list').val();
	var post_like_arr = post_like_list.slice(1, -1);
	post_like_arr = post_like_arr.split(', ');
	
	var liked_post_list = $('#liked-post-list').val();
	var liked_post_arr = liked_post_list;
	if (liked_post_list !== 'null'){
		liked_post_arr = liked_post_list.slice(1, -1);
		liked_post_arr = liked_post_arr.split(', ');
	}
	
	for(var i = 0; i < 3; i++){
		// no more posts
		if(i >= post_id_arr.length) break;
		
		var target_post_id = post_id_arr[i];
		
		// add item to grid
		$('#post-recent-grid').append(
			$('<div>').prop({
				className: 'post-item',
				id: 'post-recent-item-' + target_post_id
			})
		);
		
		// add thumbnail, title, footer to item
		$('#post-recent-item-' + target_post_id).append(
			$('<button>').prop({
				className: 'post-thumbnail',
				id: 'post-recent-thumbnail-' + target_post_id,
				type: 'button'
			}),
			$('<div>').prop({
				className: 'post-title',
				id: 'post-recent-title-' + target_post_id
			}),
			$('<div>').prop({
				className: 'post-author',
				id: 'post-recent-author-' + target_post_id
			}),
			$('<div>').prop({
				className: 'post-footer',
				id: 'post-recent-footer-' + target_post_id
			})
		);
		
		// change thumbnail
		$('#post-recent-thumbnail-' + target_post_id).attr('onClick', 'ClickPostItem(this);');
		$('#post-recent-thumbnail-' + target_post_id).css({"background":"url(data:image/;base64," + post_img_arr[i] + ")"});
		$('#post-recent-thumbnail-' + target_post_id).css('background-size', '150%');
		$('#post-recent-thumbnail-' + target_post_id).css('background-position', 'center');
		
		// change title
		$('#post-recent-title-' + target_post_id).text(post_title_arr[i]);
		
		// change author
		$('#post-recent-author-' + target_post_id).text('author: ' + post_author_arr[i]);
		
		// change footer
		var is_liked = false;
		if (liked_post_arr != 'null' && liked_post_arr !== ''){
			liked_post_arr.forEach(function(liked_post){
				if (liked_post == target_post_id){
					is_liked = true;
				}
			});
		}
		
		$('#post-recent-footer-' + target_post_id).append(
			$('<button>').prop({
				className: 'post-footer-heart',
				id: 'post-recent-footer-heart-' + target_post_id,
				type: 'button',
			})
		);
		
		$('#post-recent-footer-heart-' + target_post_id).attr('onClick', 'ClickPostLike(this);');
		
		if (is_liked == true){
			$('#post-recent-footer-heart-' + target_post_id).append('<i class="fa-solid fa-heart"></i>');
		}
		else{
			$('#post-recent-footer-heart-' + target_post_id).append('<i class="fa-regular fa-heart"></i>');
		}
		$('#post-recent-footer-' + target_post_id).append(' ' + post_like_arr[i]);
	}
}

// get all the posts
function GetAllPosts(){
	var post_id_list = $('#post-id-list').val();
	var post_id_arr = post_id_list.slice(1, -1);
	post_id_arr = post_id_arr.split(', ');
	
	var post_img_list = $('#post-img-list').val();
	var post_img_arr = post_img_list.slice(1, -1);
	post_img_arr = post_img_arr.split(', ');
	
	var post_author_list = $('#post-author-list').val();
	var post_author_arr = post_author_list.slice(1, -1);
	post_author_arr = post_author_arr.split(', ');
	
	var post_title_list = $('#post-title-list').val();
	var post_title_arr = post_title_list.slice(1, -1);
	post_title_arr = post_title_arr.split(', ');
	
	var post_like_list = $('#post-like-list').val();
	var post_like_arr = post_like_list.slice(1, -1);
	post_like_arr = post_like_arr.split(', ');
	
	var liked_post_list = $('#liked-post-list').val();
	var liked_post_arr = liked_post_list;
	if (liked_post_list !== 'null'){
		liked_post_arr = liked_post_list.slice(1, -1);
		liked_post_arr = liked_post_arr.split(', ');
	}
	
	for(var i = 0; i < post_id_arr.length; i++){
		var target_post_id = post_id_arr[i];
		
		// add item to grid
		$('#post-all-grid').append(
			$('<div>').prop({
				className: 'post-item',
				id: 'post-all-item-' + target_post_id
			})
		);
		
		// add thumbnail, title, footer to item
		$('#post-all-item-' + target_post_id).append(
			$('<button>').prop({
				className: 'post-thumbnail',
				id: 'post-all-thumbnail-' + target_post_id,
				type: 'button'
			}),
			$('<div>').prop({
				className: 'post-title',
				id: 'post-all-title-' + target_post_id
			}),
			$('<div>').prop({
				className: 'post-author',
				id: 'post-all-author-' + target_post_id
			}),
			$('<div>').prop({
				className: 'post-footer',
				id: 'post-all-footer-' + target_post_id
			})
		);
		
		// change thumbnail
		$('#post-all-thumbnail-' + target_post_id).attr('onClick', 'ClickPostItem(this);');
		$('#post-all-thumbnail-' + target_post_id).css({"background":"url(data:image/;base64," + post_img_arr[i] + ")"});
		$('#post-all-thumbnail-' + target_post_id).css('background-size', '150%');
		$('#post-all-thumbnail-' + target_post_id).css('background-position', 'center');
		
		// change title
		$('#post-all-title-' + target_post_id).text(post_title_arr[i]);
		
		// change author
		$('#post-all-author-' + target_post_id).text('author: ' + post_author_arr[i]);
		
		// change footer
		var is_liked = false;
		if (liked_post_arr != 'null' && liked_post_arr !== ''){
			liked_post_arr.forEach(function(liked_post){
				if (liked_post == target_post_id){
					is_liked = true;
				}
			});
		}
		
		$('#post-all-footer-' + target_post_id).append(
			$('<button>').prop({
				className: 'post-all-footer-heart',
				id: 'post-all-footer-heart-' + target_post_id,
				type: 'button',
			})
		);
		
		$('#post-all-footer-heart-' + target_post_id).attr('onClick', 'ClickPostLike(this);');
		
		if (is_liked == true){
			$('#post-all-footer-heart-' + target_post_id).append('<i class="fa-solid fa-heart"></i>');
		}
		else{
			$('#post-all-footer-heart-' + target_post_id).append('<i class="fa-regular fa-heart"></i>');
		}
		$('#post-all-footer-' + target_post_id).append(' ' + post_like_arr[i]);
	}
}

// user clicked post
function ClickPostItem(obj){
	var target_post_id = $(obj).attr('id').split('-')[3];
	$('#look-post-id').val(target_post_id);
	$('#look-form').submit();
}

// user clicked heart
function ClickPostLike(obj){
	var target_post_id = $(obj).attr('id').split('-')[4];
	$('#postlike-post-id').val(target_post_id);
	$('#postlike-form').submit();
}