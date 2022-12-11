$(function() {
	GetTopLikedPosts();
	GetTopLikedAuthors();
});

// get top 3 most liked posts
function GetTopLikedPosts(){
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
		$('#post-most-liked-grid').append(
			$('<div>').prop({
				className: 'post-item',
				id: 'post-most-liked-item-' + target_post_id
			})
		);
		
		// add thumbnail, title, footer to item
		$('#post-most-liked-item-' + target_post_id).append(
			$('<button>').prop({
				className: 'post-thumbnail',
				id: 'post-most-liked-thumbnail-' + target_post_id,
				type: 'button'
			}),
			$('<div>').prop({
				className: 'post-title',
				id: 'post-most-liked-title-' + target_post_id
			}),
			$('<div>').prop({
				className: 'post-author',
				id: 'post-most-liked-author-' + target_post_id
			}),
			$('<div>').prop({
				className: 'post-footer',
				id: 'post-most-liked-footer-' + target_post_id
			})
		);
		
		// change thumbnail
		$('#post-most-liked-thumbnail-' + target_post_id).attr('onClick', 'ClickPostItem(this);');
		$('#post-most-liked-thumbnail-' + target_post_id).css({"background":"url(data:image/;base64," + post_img_arr[i] + ")"});
		$('#post-most-liked-thumbnail-' + target_post_id).css('background-size', '150%');
		$('#post-most-liked-thumbnail-' + target_post_id).css('background-position', 'center');
		
		// change title
		$('#post-most-liked-title-' + target_post_id).text(post_title_arr[i]);
		
		// change author
		$('#post-most-liked-author-' + target_post_id).text('author: ' + post_author_arr[i]);
		
		// change footer
		var is_liked = false;
		if (liked_post_arr != 'null' && liked_post_arr !== ''){
			liked_post_arr.forEach(function(liked_post){
				if (liked_post == target_post_id){
					is_liked = true;
				}
			});
		}
		
		$('#post-most-liked-footer-' + target_post_id).append(
			$('<button>').prop({
				className: 'post-footer-heart',
				id: 'post-most-liked-footer-heart-' + target_post_id,
				type: 'button',
			})
		);
		
		$('#post-most-liked-footer-heart-' + target_post_id).attr('onClick', 'ClickPostLike(this);');
		
		if (is_liked == true){
			$('#post-most-liked-footer-heart-' + target_post_id).append('<i class="fa-solid fa-heart"></i>');
		}
		else{
			$('#post-most-liked-footer-heart-' + target_post_id).append('<i class="fa-regular fa-heart"></i>');
		}
		$('#post-most-liked-footer-' + target_post_id).append(' ' + post_like_arr[i]);
	}
}

// get top 5 liked authors
function GetTopLikedAuthors(){
	var most_liked_author_list = $('#most-liked-author-list').val();
	var most_liked_author_arr = most_liked_author_list.slice(1, -1);
	most_liked_author_arr = most_liked_author_arr.split(', ');
	
	var sum_most_liked_list = $('#sum-most-liked-list').val();
	var sum_most_liked_arr = sum_most_liked_list.slice(1, -1);
	sum_most_liked_arr = sum_most_liked_arr.split(', ');
	
	// init
	$('#table-top-author tbody tr').remove();
	
	// top 5
	for(var i = 0; i < 5; i++){
		// no more author
		if (i >= most_liked_author_arr.length) break;
		
		$('#table-top-author > tbody:last').append(
			'<tr><td>' + (i + 1) + '</td><td>' + most_liked_author_arr[i] + '</td><td>' + sum_most_liked_arr[i] + '</td></tr>'
		);
	}
}

// user clicked post
function ClickPostItem(obj){
	var target_post_id = $(obj).attr('id').split('-')[4];
	$('#look-post-id').val(target_post_id);
	$('#look-form').submit();
}

// user clicked heart
function ClickPostLike(obj){
	var target_post_id = $(obj).attr('id').split('-')[5];
	$('#postlike-post-id').val(target_post_id);
	$('#postlike-form').submit();
}