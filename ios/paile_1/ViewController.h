//
//  ViewController.h
//  MyDemo
//
//  Created by 糖葫芦 on 15/12/3.
//  Copyright © 2015年 糖葫芦. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CaptureSessionManager.h"

@interface ViewController : UIViewController{
    
}

@property (retain) CaptureSessionManager *captureManager;
@property (nonatomic, retain) UILabel *scanningLabel;
@property (nonatomic, retain) UIImage *imgLabel;


@end

